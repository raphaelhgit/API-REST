import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export async function getDashboard(req: Request, res: Response) {
    try {
        const organizerId = req.user!.id;

        const events = await prisma.event.findMany({
            where: { organizerId },
            orderBy: { date: "asc" },
            include: {
                _count: { select: { tickets: true } },
            },
        });

        const eventsWithStats = events.map((event) => ({
            id: event.id,
            title: event.title,
            date: event.date,
            city: event.city,
            category: event.category,
            price: event.price,
            totalSeats: event.totalSeats,
            availableSeats: event.availableSeats,
            ticketsSold: event._count.tickets,
        }));

        const totalTicketsSold = eventsWithStats.reduce((sum, e) => sum + e.ticketsSold, 0);
        const totalRevenue = eventsWithStats.reduce((sum, e) => sum + e.ticketsSold * e.price, 0);

        return res.status(200).json({
            stats: {
                totalEvents: events.length,
                totalTicketsSold,
                totalRevenue,
            },
            events: eventsWithStats,
        });
    } catch (error) {
        return res.status(500).json("Erreur serveur");
    }
}
