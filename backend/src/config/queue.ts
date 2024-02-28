import { ConnectionOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: 6379,
};
