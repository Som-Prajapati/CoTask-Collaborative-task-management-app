import { Hono } from 'hono';
import database from '../database';
import { and, eq } from 'drizzle-orm';
import { user } from '../database/schema';
import { env } from 'hono/adapter';
import { createUserValidator, getUserValidator} from '../validators';

const app = new Hono<{ Bindings: Env }>();
app.get('/', (c) => c.json({ msg: 'server up and running' }));

app.get('/user/data', getUserValidator, async (c) => {
	const db = database(c.env.DB);
	const  user  = c.req.valid('json');

	try {
		const user = await db.query.user.findMany({
			columns: {
				user_id: true,
				name: true,
				gmail: true,
			},
		});

		if (!user) return c.json({ msg: 'user not found' }, 404);

	

		return c.json({ ...user});
	} catch (error) {
		return c.json({ msg: "couldn't fetch user" }, 500);
	}
});


app.post('/my',createUserValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [newUser] = await db.insert(user).values(data).returning({ name: user.name, gmail: user.gmail });

		return c.json({ ...newUser, msg: 'user created' });
	} catch (error) {
		return c.json({ msg: "couldn't create user" }, 500);
	}
});


export default app