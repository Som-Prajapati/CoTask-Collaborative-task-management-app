import { Hono } from 'hono';
import database from '../database';
import { and, eq, Name, sql } from 'drizzle-orm';
import { user, team, user_team } from '../database/schema';
import { env } from 'hono/adapter';
import { createTeamValidator , deleteTaskSchema, deleteTeamValidator, getTeamValidator  } from '../validators';
import { use } from 'hono/jsx';


const app = new Hono<{ Bindings: Env }>();
app.get('/', (c) => c.json({ msg: 'server up and running' }));

app.post('/fetch', getTeamValidator, async (c) => {
	const db = database(c.env.DB);
	const  data  = c.req.valid('json');

  try {
    

    const [reqUser_id] = await db.select({ user_id: user.user_id}).from(user).where(eq(user.gmail, data.user_gmail));

			if (!reqUser_id) {
				return c.json({ msg: "User not found" }, 404);  // Handle case where user is not found
    }
    const getTeams = await db
			.select({  
				team_id: user_team.team_id,
			})
			.from(user_team)
			.where(eq(user_team.user_id, reqUser_id.user_id));
		
		const team_ids = getTeams.map(team => team.team_id)
			.filter(teamId => teamId !== null);

			const teamTitle= await db
			.select({
				team_title: team.title,
				team_img : team.imgText
			})
			.from(team)
			.where(sql`${team.team_id} IN (${sql.join([...team_ids], sql`,`)})`);
	


		return c.json({ teamTitle});
	} catch (error) {
		return c.json({  msg: "couldn't fetch team" }, 500);
	}
});

app.post('/create', createTeamValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [newTeam] = await db.insert(team).values(data).returning({ name: team.title, team_id: team.team_id });
	
		const newUsers = await db
			.select({
				user_id: user.user_id,
			})
			.from(user)
			.where(sql`${user.name} IN (${sql.join([...data.user_array], sql`,`)})`);
	
		const userIds = newUsers.map((user) => user.user_id);

		const userTeamInserts = userIds.map((userId) => ({
			user_id: userId,
			team_id: newTeam.team_id,
		}));
	
		const feedUsers = await db.insert(user_team).values(userTeamInserts);

		return c.json({ newTeam, newUsers, msg: 'team created' });
	} catch (error) {
		return c.json({ msg: "couldn't create team4" }, 500);
	}
});


app.delete('/delete',deleteTeamValidator, async (c) => {
	const db = database(c.env.DB);
	const  data  = c.req.valid('json');

    try {
    
      
			// const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

			// if (!reqUser_id) {
			// 	return c.json({ msg: "user not found" }, 404);  // Handle case where user is not found
			// }
			
			const [reqTeam_id] = await db.select({ team_id: team.team_id }).from(team).where(eq(team.title, data.team_name));

			if (!reqTeam_id) {
				return c.json({ msg: "team not found" }, 404);  // Handle case where user is not found
			}



			await db.delete(user_team).where(eq(user_team.team_id,reqTeam_id.team_id));
			
		
			await db.delete(team).where(eq(team.team_id,reqTeam_id.team_id));
			
		

		return c.json({ msg : "team deleted succesfully"});
	} catch (error) {
		return c.json({ msg: "couldn't delete team" }, 500);
	}
});





// app.patch('/update',updateUserValidator, async (c) => {
// 	const db = database(c.env.DB);
// 	const data = c.req.valid('json');

// 	try {

// 		const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

// 		if (!reqUser_id) {
// 			return c.json({ msg: "User not found" }, 404);  // Handle case where user is not found
// 		}

// 		const userData = {
// 						// user_id: reqUser_id.user_id,
// 						name: data.name,
// 						phone : data.phone || 0,
// 						address : data.address || null,
// 						password: data.password || null,
// 					}

// 					const [updateUser] = await db
// 					.update(user)
// 					.set(userData)  // Set the fields to be updated
// 					.where(eq(user.user_id, reqUser_id.user_id))  // Ensure correct user is updated
// 					.returning({ user_id : user.user_id });  // Return the columns after update

// 		return c.json({ ...updateUser, msg: 'user updated' });
// 	} catch (error) {
// 		return c.json({ msg: "couldn't create user" }, 500);
// 	}
// });

export default app;
