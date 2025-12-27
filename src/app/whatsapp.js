import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import qrcode from "qrcode-terminal";
import { logger } from "./logging.js";
import { delay } from "../utils/mix.js";

const wa = new Client({
  authStrategy: new LocalAuth(),
});

wa.on("qr", (qr) => {
  logger.info("qr code whatsapp tergenerate");
  qrcode.generate(qr, { small: true });
});

wa.on("ready", async () => {
  delay(3000);
  logger.info("bot wa siap mengirim pesan!");
});

wa.initialize();

export { wa };
