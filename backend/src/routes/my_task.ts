import { Hono } from 'hono';
import database from '../database';
import { and, eq, sql } from 'drizzle-orm';
import { list , user ,task, task_assigned } from '../database/schema';
import { env } from 'hono/adapter';
import { createTaskValidator , deleteTaskValidator, getTaskValidator , updateTaskValidator} from '../validators';


///// done..


const app = new Hono<{ Bindings: Env }>();
app.get('/', (c) => c.json({ msg: 'server up and running' }));



	app.post('/create',createTaskValidator, async (c) => {
		const db = database(c.env.DB);
		const data = c.req.valid('json');

		try {
      const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));
			if (!reqUser_id) {
				return c.json({ msg: "User not found" }, 404);
      }
      let reqList_id = null;  
      if (data.list_name) {
        const [listItem] = await db.select({ list_id: list.list_id }).from(list).where(eq(list.name, data.list_name));
  
        if (!listItem) {
          return c.json({ msg: "List not found" }, 404);  // Handle case where list is not found
        }
        reqList_id = listItem.list_id;  // Assign the list_id from the fetched result
      }
      const taskData = {
        title: data.title,
        descrption: data.description,  // Note: 'description' is misspelled here
        status: data.status ,  // Default to "ongoing" if not provided
        start_d: data.start_d ,  // Default to current timestamp if not provided
        end_d: new Date(data.end_d),
        priority: data.priority ,  // Default to 0 if not provided
        assigner_id: reqUser_id.user_id,
        list_id: reqList_id // Use the correct variable
      };
			const [newTask] = await db.insert(task).values(taskData).returning({task_id: task.task_id  })
      
    
      const assignedData = {
        task_id: newTask.task_id ,
        user_id: reqUser_id.user_id

      }
			const [newAssigned] = await db.insert(task_assigned).values(assignedData).returning({task_id : task.task_id  })

      
      return c.json({ newTask, msg: 'task made' });
		} catch (error) {
			return c.json({ msg: "couldn't make a task" }, 500)
		}
  });
  
  app.post('/fetch',getTaskValidator, async (c) => {
	const db = database(c.env.DB);
	const  data  = c.req.valid('json');

    try {
    
      
			const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

			if (!reqUser_id) {
				return c.json({ msg: "user not found" }, 404);  // Handle case where user is not found
      }
      
      const [reqList_id] = await db.select({ list_id: list.list_id }).from(list).where(and(eq(list.name, data.list_name),eq(list.user_id, reqUser_id.user_id)));

			if (!reqList_id) {
				return c.json({ msg: "list not found" }, 404);  // Handle case where user is not found
      }
      

		const newTask = await db.query.task.findMany({
      where:and (eq(task.assigner_id, reqUser_id.user_id),eq(task.list_id, reqList_id.list_id)),
      columns: {
        title: true,
        descrption: true,
        start_d: true,
        end_d: true,
        priority: true,
				status: true,
				task_id : true

			},
    });

		if (!newTask) return c.json({ msg: 'Task not found' }, 404);

	

		return c.json({ newTask});
	} catch (error) {
		return c.json({ msg: "couldn't fetch list" }, 500);
	}
});


app.delete('/delete', deleteTaskValidator, async (c) => {
	const db = database(c.env.DB);
	const  data  = c.req.valid('json');

    try {
    
      
			const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

			if (!reqUser_id) {
				return c.json({ msg: "user not found" }, 404);  // Handle case where user is not found
		}
	  await db.delete(task).where(and(eq(task.assigner_id, reqUser_id.user_id),eq(task.task_id, data.task_id)));
		
	

		return c.json({ msg : "task deleted succesfully"});
	} catch (error) {
		return c.json({ msg: "no task exist" }, 500);
	}
});



app.patch('/update', updateTaskValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {

		const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

		if (!reqUser_id) {
			return c.json({ msg: "User not found" }, 404);  // Handle case where user is not found
		}
		
		const taskData = {
						// user_id: reqUser_id.user_id,
            status: data.status,
            priority : 0
					}	

					const [updateTask] = await db
					.update(task)
					.set(taskData)  // Set the fields to be updated
					.where(and(eq(task.assigner_id, reqUser_id.user_id),(eq(task.title, data.task_name) )))  // Ensure correct user is updated
					.returning({ user_id : user.user_id });  // Return the columns after update

		return c.json({ updateTask, msg: 'Task marked completed' });
	} catch (error) {
		return c.json({ msg: "couldn't mark completed" }, 500);
	}
});





export default app