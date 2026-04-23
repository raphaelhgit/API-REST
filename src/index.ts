import express from "express";
import 'dotenv/config';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import userRouter from "./routes/users.routes";
import eventRouter from "./routes/events.routes";
import ticketRouter from "./routes/tickets.routes";
import dashboardRouter from "./routes/dashboard.routes";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(port, () => {
    console.log(`le serveur écoute le port ${port}`);
});