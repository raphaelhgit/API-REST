import { prisma } from "../lib/prisma.js";
import { RegisterUserDTO, LoginUserDTO, UpdateUserDTO } from "../models/users.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password }: RegisterUserDTO = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("nom, email et mot de passe requis");
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json("un compte existe déjà avec cet email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password }: LoginUserDTO = req.body;

        if (!email || !password) {
            return res.status(400).json("email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json("Email ou mot de passe incorrect");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json("Email ou mot de passe incorrect");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function getMe(req: Request, res: Response) {
    try {
        const userId = req.user!.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });

        if (!user) {
            return res.status(404).json("Utilisateur introuvable");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function updateMe(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const { name }: UpdateUserDTO = req.body;

        if (!name) {
            return res.status(400).json("le nom est requis");
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}
