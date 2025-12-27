import ollama from "ollama";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const userHistory = new Map();

const dataForResponse = [
  {
    text: "kekerasan fisik",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut di form ini",
  },
  {
    text: "bully",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "bullying",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "perundungan",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dirundung",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dibully",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dibuli",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dihina",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "diejek",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dicaci",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dipermalukan",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "kata kasar",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "makian",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "diolok",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dilecehkan",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "ancaman",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "diancam",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dipukul",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "ditendang",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "didorong",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "disakiti",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "penganiayaan",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "cyber bullying",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "bully online",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "fitnah",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "komen jahat",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "pesan ancaman",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "diteror",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "dipaksa",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "intimidasi",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "takut ke sekolah",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "takut kesekolah",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "takut ketemu",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "rakut bertemu",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "aku takut",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "aku tidak nyaman",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "aku merasa tertekan",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "aku trauma",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "aku diperlakukan buruk",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
  {
    text: "aku merasa disakiti",
    response:
      "Oke saya paham anda pasti takut ingin melapor langsung apa yang anda alami di sekolah, anda bisa membuat laporan tersebut melalui form dibawah ini",
  },
];

wss.on("connection", (socket) => {
  userHistory.set(socket, []);
  socket.on("message", async (data) => {
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

    const res = await ollama.chat({
      model: "llama3.1:8b-instruct-q4_K_M",
      messages: [
        { role: "system", content: "kamu pendengar empatik" },
        {
          role: "system",
          content: "yang mengobrol bersamamu adalah korban bullying",
        },
        ...history,
      ],
      stream: true,
    });

    let fullResponse = "";

    for await (const part of res) {
      fullResponse += part.message?.content || "";
    }

    // // kirim setelah selesai
    socket.send(fullResponse);

    // simpan ke history biar percakapan lanjut
    history.push({ role: "assistant", content: fullResponse });
  });
});

export default wss;
