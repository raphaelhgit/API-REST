import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controllers";
import { authenticate, requireRole } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, requireRole("orga", "admin"), getDashboard);

export default router;
