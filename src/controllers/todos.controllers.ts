import { createTodosDTO, updateTodosDTO } from "../models/todos.js";
import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export async function getTodos(req: Request, res: Response) {
    try {
        const todos = await prisma.todo.findMany();
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function getTodosById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            return res.status(400).json("id non valide");
        }
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            return res.status(404).json("Todo introuvable");
        }
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function createTodos(req: Request, res: Response) {
    try {
        const { title, description }: createTodosDTO = req.body;
        if (!title) {
            return res.status(400).json("met un titre");
        }
        const todo = await prisma.todo.create({
            data: { title, description }
        });
        return res.status(201).json(todo);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            return res.status(400).json("id non valide");
        }
        const { title, description, completed }: updateTodosDTO = req.body;
        const existing = await prisma.todo.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json("Todo introuvable");
        }
        const todo = await prisma.todo.update({
            where: { id },
            data: { title, description, completed }
        });
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            return res.status(400).json("id non valide");
        }
        const existing = await prisma.todo.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json("Todo introuvable");
        }
        await prisma.todo.delete({ where: { id } });
        return res.status(200).json("Todo supprimée");
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}
