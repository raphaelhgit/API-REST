import { Router } from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../controllers/events.controllers";
import { authenticate, requireRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", authenticate, requireRole("orga", "admin"), createEvent);
router.put("/:id", authenticate, requireRole("orga", "admin"), updateEvent);
router.delete("/:id", authenticate, requireRole("orga", "admin"), deleteEvent);

export default router;
