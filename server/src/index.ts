import "dotenv/config.js";
import { createServer } from "node:http";
import createApp from "./app.js";
import connectDb from "./common/config/db.js";
import { initSocket } from "./common/socket/socket.js";

async function main() {
  const PORT: number = Number(process.env.PORT) | 3000;

  await connectDb();

  const server = createServer(createApp());

  initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server started at running ${PORT}`);
  });
}

main().catch((e: Error) => {
  console.log(`Error while starteing server ${e.message}`);
  process.exit(1);
});
