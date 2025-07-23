/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import user from './routes/user';
import feedback from './routes/feedback';
import list from './routes/list';
import myTask from './routes/my_task';
import team from './routes/team';
import teamTask from './routes/team_task';
import taskAssigned from './routes/task_assigned';




const app = new Hono();

app.use('*', cors());
app.route('/user', user);
app.route('/feedback', feedback);
app.route('/list', list);
app.route('/myTask', myTask);
app.route('/teamTask', teamTask);
app.route('/team', team);
app.route('/taskAssigned', taskAssigned);







app.notFound((c) => c.json({ msg: 'not found' }, 404));

export default app;