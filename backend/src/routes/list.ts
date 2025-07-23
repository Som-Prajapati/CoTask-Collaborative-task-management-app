import { Hono } from 'hono';
import database from '../database';
import { and, eq } from 'drizzle-orm';
import { list , user} from '../database/schema';
import { env } from 'hono/adapter';
import { createListValidator ,  getListValidator, deleteListValidator} from '../validators';


////done...


const app = new Hono<{ Bindings: Env }>();
app.get('/', (c) => c.json({ msg: 'server up and running' }));



	app.post('/create',createListValidator, async (c) => {
		const db = database(c.env.DB);
		const data = c.req.valid('json');

		try {

			const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

			if (!reqUser_id) {
				return c.json({ msg: "User not found" }, 404);  // Handle case where user is not found
		}

			const listData = {
        name: data.name,
        user_id : reqUser_id.user_id
			}
			
			const [newList] = await db.insert(list).values(listData).returning({list_id : list.list_id , user_id : user.user_id });

			return c.json({ newList, msg: 'list made' });
		} catch (error) {
			return c.json({ msg: "couldn't make a list" }, 500);

		}
  });
  
  app.post('/fetch', getListValidator, async (c) => {
	const db = database(c.env.DB);
	const  data  = c.req.valid('json');

    try {
    
      
			const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

			if (!reqUser_id) {
				return c.json({ msg: "user not found" }, 404);  // Handle case where user is not found
		}
		const newList = await db.query.list.findMany({
      where: eq(list.user_id, reqUser_id.user_id),
      columns: {
        name: true,  // Only fetch the 'name' column
      },
    });

		if (!newList) return c.json({ msg: 'list not found' }, 404);

	

		return c.json({ newList});
	} catch (error) {
		return c.json({ msg: "couldn't fetch list" }, 500);
	}
});


app.delete('/delete', deleteListValidator, async (c) => {
	const db = database(c.env.DB);
	const  data  = c.req.valid('json');

    try {
    
      
			const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

			if (!reqUser_id) {
				return c.json({ msg: "user not found" }, 404);  // Handle case where user is not found
		}
	  await db.delete(list).where(and(eq(list.user_id, reqUser_id.user_id),eq(list.name, data.name)));
		
	

		return c.json({ msg : "list deleted succesfully"});
	} catch (error) {
		return c.json({ msg: "no list exist" }, 500);
	}
});


export default app