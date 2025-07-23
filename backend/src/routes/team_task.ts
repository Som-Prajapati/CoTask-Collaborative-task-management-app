import { Hono } from 'hono';
import database from '../database';
import { and, eq, sql, isNotNull } from 'drizzle-orm';
import { list, team, task, user, user_team, task_assigned } from '../database/schema';
import { env } from 'hono/adapter';
import { createTeamTaskValidator, deleteTeamTaskValidator, getTeamTaskValidator } from '../validators';

///// done..

const app = new Hono<{ Bindings: Env }>();
app.get('/', (c) => c.json({ msg: 'server up and running' }));

app.post('/create', createTeamTaskValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));
		if (!reqUser_id) {
			return c.json({ msg: 'User not found' }, 404);
		}
		if (!data.team_name) {
			return c.json({ msg: 'Team name is required' }, 400);
		  }
		const [reqTeam_id] = await db.select({ team_id: team.team_id }).from(team).where(eq(team.title, data.team_name));
		if (!reqTeam_id) {
			return c.json({ msg: 'Team not found' }, 404);
		}

		const taskData = {
			title: data.title,
			descrption: data.description, // Note: 'description' is misspelled here
			status: data.status, // Default to "ongoing" if not provided
			start_d: data.start_d, // Default to current timestamp if not provided
			end_d: new Date(data.end_d),
			priority: data.priority, // Default to 0 if not provided
			assigner_id: reqUser_id.user_id,
			team_id: reqTeam_id.team_id, // Use the correct variable
		};
		const [newTask] = await db.insert(task).values(taskData).returning({ task_id: task.task_id });

		const newUsers = await db
			.select({
				user_id: user.user_id,
			})
			.from(user)
			.where(sql`${user.name} IN (${sql.join([...data.user_array], sql`,`)})`);

		const updatedUser = newUsers.map((user) => user.user_id);

		const assignedData = updatedUser.map((user_id) => ({
			task_id: newTask.task_id, // Use the new task's ID
			user_id: user_id, // Assign each user to the task
		}));

		const teamTask = await db.insert(task_assigned).values(assignedData);

		return c.json({ teamTask, msg: 'team task made' });
	} catch (error) {
		return c.json({ msg: "couldn't make a team task" }, 500);
	}
});

app.post('/fetch', getTeamTaskValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

		if (!reqUser_id) {
			return c.json({ msg: 'user not found' }, 404); // Handle case where user is not found
		}

		const [reqTeam_id] = await db.select({ team_id: team.team_id }).from(team).where(eq(team.title, data.team_name));

		if (!reqTeam_id) {
			return c.json({ msg: 'team not found' }, 404); // Handle case where user is not found
		}

		const newTask = await db.query.task.findMany({
			where: and(eq(task.team_id, reqTeam_id.team_id), isNotNull(task.assigner_id)),
			columns: {
				title: true,
				descrption: true,
				start_d: true,
				end_d: true,
				priority: true,
				status: true,
				assigner_id: true,
				task_id: true,
			},
		});

		const tasksWithAssignerImages = await Promise.all(
			newTask.map(async (task) => {
				if (task.assigner_id !== null) {
					// Fetch the assigner image if assigner_id is not null
					const assignerImg = await db.query.user.findFirst({
						where: eq(user.user_id, task.assigner_id),
						columns: {
							user_id: true,
							imgText: true,
							name : true
						},
					});

					return {
						assigner_img: assignerImg ? assignerImg.imgText : null,
						assigner_name: assignerImg ? assignerImg.name : null,
						...task,
					};
				} else {
					// If assigner_id is null, simply return the task without an image
					return {
						...task,
						assigner_img: null,
					};
				}
			})
		);

		return c.json(tasksWithAssignerImages);
	} catch (error) {
		return c.json({ msg: "couldn't fetch list" }, 500);
	}
});

app.delete('/delete', deleteTeamTaskValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [reqTeam_id] = await db.select({ team_id: team.team_id }).from(team).where(eq(team.title, data.team_name));

		if (!reqTeam_id) {
			return c.json({ msg: 'team not found' }, 404); // Handle case where user is not found
		}
		await db.delete(task).where(and(eq(task.team_id, reqTeam_id.team_id), eq(task.task_id, data.task_id)));

		return c.json({ msg: 'task deleted succesfully' });
	} catch (error) {
		return c.json({ msg: 'no task exist' }, 500);
	}
});

// app.patch('/update', updateTaskValidator, async (c) => {
// 	const db = database(c.env.DB);
// 	const data = c.req.valid('json');

// 	try {

// 		const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

// 		if (!reqUser_id) {
// 			return c.json({ msg: "User not found" }, 404);  // Handle case where user is not found
// 		}

// 		const taskData = {
// 						// user_id: reqUser_id.user_id,
//             status: data.status,
//             priority : 0
// 					}

// 					const [updateTask] = await db
// 					.update(task)
// 					.set(taskData)  // Set the fields to be updated
// 					.where(and(eq(task.assigner_id, reqUser_id.user_id),(eq(task.title, data.task_name) )))  // Ensure correct user is updated
// 					.returning({ user_id : user.user_id });  // Return the columns after update

// 		return c.json({ ...updateTask, msg: 'Task marked completed' });
// 	} catch (error) {
// 		return c.json({ msg: "couldn't mark completed" }, 500);
// 	}
// });

export default app;
