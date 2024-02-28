import "dotenv/config";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import { Server, createServer } from "node:http";
import Routes from "./routes/api.js";
import SocketInstance from "./config/socket.js";

const app: Application = express();
const server: Server = createServer(app);
const port = process.env.PORT || 8000;

SocketInstance(server);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Good to see you guys");
});

// * Routes

app.use("/api", Routes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
