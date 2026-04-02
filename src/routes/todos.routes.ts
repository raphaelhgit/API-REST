import { Router } from "express";
import { getTodos, getTodosById, createTodos, updateTodo, deleteTodo } from "../controllers/todos.controllers"

const router = Router();

router.get('/', getTodos)
router.get('/:id', getTodosById)
router.post('/', createTodos)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router