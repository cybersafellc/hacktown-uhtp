import ollama from "ollama";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const userHistory = new Map();

const dataForResponse = [
  {
    text: "kekerasan fisik",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut di form ini : https://message.testings/hehe",
  },
];

wss.on("connection", (socket) => {
  userHistory.set(socket, []);
  socket.on("message", async (data) => {
    socket.send("Hello ini testing");
    // cek dulu siapa tau meminta data pasti
    const message = data.toString();
    for (const tp of dataForResponse) {
      if (message.includes(tp.text)) {
        socket.send(tp.response);
        return;
      }
    }

    const history = userHistory.get(socket);
    history.push({ role: "user", content: data.toString() });

    // const res = await ollama.chat({
    //   model: "llama3.1:8b-instruct-q4_K_M",
    //   messages: [
    //     { role: "system", content: "kamu pendengar empatik" },
    //     {
    //       role: "system",
    //       content: "yang mengobrol bersamamu adalah korban bullying",
    //     },
    //     ...history,
    //   ],
    //   stream: true,
    // });

    // let fullResponse = "";

    // for await (const part of res) {
    //   fullResponse += part.message?.content || "";
    // }

    // // // kirim setelah selesai
    // socket.send(fullResponse);

    // // simpan ke history biar percakapan lanjut
    // history.push({ role: "assistant", content: fullResponse });
  });
});

export default wss;
