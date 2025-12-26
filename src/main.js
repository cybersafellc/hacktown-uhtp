import dotenv from "dotenv";
import { web } from "./app/web.js";
import http from "http";
import { logger } from "./app/logging.js";
import wss from "./app/chatbot.js"; // untuk di intrepreter
dotenv.config();
const port = process.env.PORT || 6000;
const host = process.env.HOST || "https://api-hacktown.rusnandapurnama.com";

const server = http.createServer(web);
server.listen(port, function () {
  logger.info(`server running on ${host}`);
});
