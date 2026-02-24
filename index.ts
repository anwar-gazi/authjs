import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { service as serviceFactory } from './lib/factory';
import { tokenExpireAt } from './lib/settingsUtil';

dotenv.config();

const app = Fastify({
  logger: false // Set to true if you want default Fastify logging
});
const port: number = 4000;

app.register(cors, {
  // put your options here
});

app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
  return 'API is running...';
});

app.get('/health', async (req: FastifyRequest, reply: FastifyReply) => {
  return { status: 'UP' };
});

app.get('/user_exists', async (req: FastifyRequest<{ Querystring: { email?: string } }>, reply: FastifyReply) => {
  const email = req.query.email;
  // TODO: implement logic
  return { exists: false };
});

app.post('/get_token', async (req: FastifyRequest<{ Querystring: { email: string } }>, reply: FastifyReply) => {
  const email = req.query.email;
  const service = serviceFactory();
  const tokenInfo = await service.generateJwtInfo(email, tokenExpireAt());
  return { success: !!tokenInfo, tokenInfo };
});

if (require.main === module) {
  const start = async () => {
    try {
      await app.listen({ port, host: '0.0.0.0' });
      console.log(`Server is running on http://127.0.0.1:${port}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
  start();
}

export { app };
