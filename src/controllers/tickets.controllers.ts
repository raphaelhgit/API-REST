import { prisma } from "../lib/prisma.js";
import { BuyTicketDTO } from "../models/tickets.js";
import type { Request, Response } from "express";
import QRCode from "qrcode";
import crypto from "crypto";

export async function buyTicket(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const { eventId }: BuyTicketDTO = req.body;

        if (!eventId) {
            return res.status(400).json("eventId requis");
        }

        const event = await prisma.event.findUnique({ where: { id: eventId } });

        if (!event) {
            return res.status(404).json("Événement introuvable");
        }

        if (new Date(event.date) < new Date()) {
            return res.status(400).json("Impossible d'acheter un billet pour un événement passé");
        }

        if (event.availableSeats <= 0) {
            return res.status(409).json("Plus de places disponibles");
        }

        const uniqueCode = crypto.randomUUID();
        const qrCode = await QRCode.toDataURL(uniqueCode);

        const [ticket] = await prisma.$transaction([
            prisma.ticket.create({
                data: { userId, eventId, qrCode: uniqueCode },
                include: {
                    event: { select: { id: true, title: true, date: true, venue: true, city: true } },
                },
            }),
            prisma.event.update({
                where: { id: eventId },
                data: { availableSeats: { decrement: 1 } },
            }),
        ]);

        return res.status(201).json({ ...ticket, qrCodeImage: qrCode });
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function getMyTickets(req: Request, res: Response) {
    try {
        const userId = req.user!.id;

        const tickets = await prisma.ticket.findMany({
            where: { userId },
            include: {
                event: { select: { id: true, title: true, date: true, venue: true, city: true, category: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}

export async function getTicketById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params["id"] as string);
        const userId = req.user!.id;
        const userRole = req.user!.role;

        const ticket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                event: { select: { id: true, title: true, date: true, venue: true, city: true, category: true } },
                user: { select: { id: true, name: true, email: true } },
            },
        });

        if (!ticket) {
            return res.status(404).json("Billet introuvable");
        }

        if (ticket.userId !== userId && userRole !== "admin") {
            return res.status(403).json("Accès interdit");
        }

        const qrCodeImage = await QRCode.toDataURL(ticket.qrCode);

        return res.status(200).json({ ...ticket, qrCodeImage });
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}
