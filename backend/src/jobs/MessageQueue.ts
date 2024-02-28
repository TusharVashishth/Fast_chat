import { Job, Queue, Worker } from "bullmq";
import { redisConnection } from "../config/queue.js";
import { prismaClient } from "../config/db.config.js";

type MessageType = {
  group_id: string;
  message: string;
  created_at: string;
  type: number;
  name: string;
};

// Create a new connection in every instance
export const messageQueue = new Queue("messageQueue", {
  connection: redisConnection,
  defaultJobOptions: {
    delay: 500,
  },
});

const messageWorker = new Worker(
  "messageQueue",
  async (job: Job) => {
    console.log("The message job is", job.data);
    await prismaClient.messages.create({ data: job.data as MessageType });
  },
  {
    connection: redisConnection,
    removeOnFail: { count: 0 },
    removeOnComplete: { count: 0 },
  }
);

messageWorker.on("completed", (job) => {
  console.log("job completed", job);
});

messageWorker.on("failed", (job) => {
  console.log("job failed", job);
});
