import { Router } from "express";
import { getTodos, getTodosById, createTodos     } from "../controllers/todos.controllers"

const router = Router();

// GET /api/todos
router.get('/', getTodos)

router.get('/:id', getTodosById)

router.post('/', createTodos)

export default router