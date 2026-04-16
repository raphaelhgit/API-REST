import { prisma } from "../lib/prisma.js";
import { CreateEventDTO, UpdateEventDTO, Category } from "../models/events.js";
import type { Request, Response } from "express";

export async function getAllEvents(req: Request, res: Response) {
    try {
        const { category, city, minPrice, maxPrice, upcoming } = req.query;

        const where: Record<string, unknown> = {};

        if (category) {
            where.category = category as Category;
        }

        if (city) {
            where.city = { contains: city as string };
        }

        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice ? { gte: parseFloat(minPrice as string) } : {}),
                ...(maxPrice ? { lte: parseFloat(maxPrice as string) } : {}),
            };
        }

        if (upcoming === "true") {
            where.date = { gte: new Date() };
        }

        const events = await prisma.event.findMany({
            where,
            orderBy: { date: "asc" },
            include: {
                organizer: {
                    select: { id: true, name: true },
                },
            },
        });

        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function getEventById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params["id"] as string);

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                organizer: {
                    select: { id: true, name: true },
                },
            },
        });

        if (!event) {
            return res.status(404).json("Événement introuvable");
        }

        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function createEvent(req: Request, res: Response) {
    try {
        const organizerId = req.user!.id;
        const { title, description, date, venue, city, price, totalSeats, category, image }: CreateEventDTO = req.body;

        if (!title || !description || !date || !venue || !city || price === undefined || !totalSeats || !category) {
            return res.status(400).json("Tous les champs obligatoires doivent être renseignés");
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                venue,
                city,
                price,
                totalSeats,
                availableSeats: totalSeats,
                category,
                image,
                organizerId,
            },
        });

        return res.status(201).json(event);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function updateEvent(req: Request, res: Response) {
    try {
        const id = parseInt(req.params["id"] as string);
        const userId = req.user!.id;
        const userRole = req.user!.role;
        const body: UpdateEventDTO = req.body;

        const event = await prisma.event.findUnique({ where: { id } });

        if (!event) {
            return res.status(404).json("Événement introuvable");
        }

        if (event.organizerId !== userId && userRole !== "admin") {
            return res.status(403).json("Vous ne pouvez modifier que vos propres événements");
        }

        const updated = await prisma.event.update({
            where: { id },
            data: {
                ...(body.title && { title: body.title }),
                ...(body.description && { description: body.description }),
                ...(body.date && { date: new Date(body.date) }),
                ...(body.venue && { venue: body.venue }),
                ...(body.city && { city: body.city }),
                ...(body.price !== undefined && { price: body.price }),
                ...(body.totalSeats !== undefined && { totalSeats: body.totalSeats }),
                ...(body.category && { category: body.category }),
                ...(body.image !== undefined && { image: body.image }),
            },
        });

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function deleteEvent(req: Request, res: Response) {
    try {
        const id = parseInt(req.params["id"] as string);
        const userId = req.user!.id;
        const userRole = req.user!.role;

        const event = await prisma.event.findUnique({ where: { id } });

        if (!event) {
            return res.status(404).json("Événement introuvable");
        }

        if (event.organizerId !== userId && userRole !== "admin") {
            return res.status(403).json("Vous ne pouvez supprimer que vos propres événements");
        }

        const soldTickets = event.totalSeats - event.availableSeats;
        if (soldTickets > 0) {
            return res.status(409).json("Impossible de supprimer un événement avec des billets vendus");
        }

        await prisma.event.delete({ where: { id } });

        return res.status(200).json("Événement supprimé");
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}
