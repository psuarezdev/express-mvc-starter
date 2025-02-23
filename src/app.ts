import { join } from 'node:path';
import express, { urlencoded } from 'express';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import dotenv from 'dotenv';
import { loadControllers } from 'awilix-express';
import { loadContainer } from '@/lib/container';
import { redisClient } from '@/lib/redis';
import { authenticate } from '@/middlewares/auth.middleware';

dotenv.config();

const app = express();

app.set('trust proxy', 1);
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.EXPRESS_SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  }
}));

app.use(express.static(join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(urlencoded({ extended: true }));
app.use(authenticate);

export const container = loadContainer(app);

app.use(loadControllers(
  '**/*.controller.{ts,js}',
  { cwd: __dirname }
));

export default app;
