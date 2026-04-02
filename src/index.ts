import express from "express";
import 'dotenv/config';
import todoRouter from "./routes/todos.routes"

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json())

app.use('/api/todos', todoRouter)

app.listen(port, () => {
    console.log(`le serveur écoute le port ${port}`);
})