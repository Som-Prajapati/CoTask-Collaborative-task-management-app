import { Hono } from 'hono';
import database from '../database';
import { and, eq, Name } from 'drizzle-orm';
import { user } from '../database/schema';
import { env } from 'hono/adapter';
import { createUserValidator, getUserValidator , updateUserValidator} from '../validators';
import { use } from 'hono/jsx';

///done.


const app = new Hono<{ Bindings: Env }>();
app.get('/', (c) => c.json({ msg: 'server up and running' }));

app.get('/fetch', getUserValidator, async (c) => {
	const db = database(c.env.DB);
	const  user  = c.req.valid('json');

	try {
		const user = await db.query.user.findMany({
			columns: {
				user_id: true,
				name: true,
				gmail: true,
				imgText: true,
			},
		});

		if (!user) return c.json({ msg: 'user not found' }, 404);

	

		return c.json({ user});
	} catch (error) {
		return c.json({ msg: "couldn't fetch user" }, 500);
	}
});


app.post('/create',createUserValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [newUser] = await db.insert(user).values(data).returning({ name: user.name, gmail: user.gmail });

		return c.json({ newUser, msg: 'user created' });
	} catch (error) {
		return c.json({ msg: "couldn't create user" }, 500);
	}
});

app.patch('/update',updateUserValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {

		const [reqUser_id] = await db.select({ user_id: user.user_id }).from(user).where(eq(user.gmail, data.user_gmail));

		if (!reqUser_id) {
			return c.json({ msg: "User not found" }, 404);  // Handle case where user is not found
		}
		
		const userData = {
						// user_id: reqUser_id.user_id,
						name: data.name,
						phone : data.phone || 0,
						address : data.address || null,
						password: data.password || null,
					}	

					const [updateUser] = await db
					.update(user)
					.set(userData)  // Set the fields to be updated
					.where(eq(user.user_id, reqUser_id.user_id))  // Ensure correct user is updated
					.returning({ user_id : user.user_id });  // Return the columns after update

		return c.json({ updateUser, msg: 'user updated' });
	} catch (error) {
		return c.json({ msg: "couldn't create user" }, 500);
	}
});



export default app