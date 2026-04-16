import { Router } from "express";
import { register, login, getMe, updateMe } from "../controllers/users.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.put("/me", authenticate, updateMe);

export default router;
