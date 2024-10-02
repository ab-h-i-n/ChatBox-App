import "dotenv/config";
import { app, server } from "./routes/socket.js";
import { router as roomRoutes } from "./routes/roomRoutes.js";
import log from "./utils/log.js";

app.use("/rooms", roomRoutes);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
  setInterval(() => {
    Ping();
    ping++;
  }, 30000);
});

app.get("/", (req, res) => {
  res.send("Server is running");

});

var ping = 0;
app.get("/ping", (req, res) => {
  log({
    ping: ping,
  });
  res.json({
    ping: ping,
  });
});

async function Ping() {
  await fetch(`http://localhost:4000/ping`);
}
