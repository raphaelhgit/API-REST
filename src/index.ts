import express from "express";
import 'dotenv/config';
import todoRouter from "./routes/todos.routes"

const port = process.env.PORT
const app = express();

app.use(express.json())

app.use(todoRouter)

app.listen(port, () => {
    console.log('le serveur écoute le port ${port}');
})