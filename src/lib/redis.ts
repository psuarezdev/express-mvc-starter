import { createClient } from 'redis';

export const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.connect()
  .then(() => console.log('Connected to redis!'))
  .catch((err) => console.error('Error during connecting to redis:', err));
