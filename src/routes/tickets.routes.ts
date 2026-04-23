import { Router } from "express";
import { buyTicket, getMyTickets, getTicketById } from "../controllers/tickets.controllers";
import { authenticate, requireRole } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, requireRole("user", "orga", "admin"), buyTicket);
router.get("/mine", authenticate, getMyTickets);
router.get("/:id", authenticate, getTicketById);

export default router;
