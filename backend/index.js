import "dotenv/config";
import { app, server } from "./routes/socket.js";
import { router as roomRoutes } from "./routes/roomRoutes.js";

app.use('/rooms' , roomRoutes);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
});

