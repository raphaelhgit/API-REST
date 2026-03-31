import { describe } from "node:test";
import { createTodosDTO, mockTodos, Todo } from "../models/todos.js";
import type { Request, Response } from "express";

export function getTodos(req: Request, res: Response) {
  res.status(200).json(mockTodos);
}

export function getTodosById(req: Request, res: Response) {
  const id = req.params.id;
  if (id && typeof id === "string") {
    //cherche dans la bdd
    const todo = mockTodos.find((todo) => todo.id === parseInt(id));
    return res.status(400).json(todo);
  }
  return res.status(400).json("id non valide");
}

export function createTodos(req: Request, res: Response) {
    try {
        //recup les infos du body
        const {title, description} : createTodosDTO = req.body;

        //validation 
        if (!title) {
            return res.status(400).json("met un titre");
        }
        // creation de la new todo
        const todo: Todo = {
            completed : false,
            title : title,
            description : description,
            id : mockTodos.length + 1 
        }
    }
    todo.description : description 

    catch (errror) {
        return res.status(500).json("Erreur serveur");
    }
}
