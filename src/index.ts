import express from "express";
import 'dotenv/config';
import userRouter from "./routes/users.routes";
import eventRouter from "./routes/events.routes";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

app.listen(port, () => {
    console.log(`le serveur écoute le port ${port}`);
});