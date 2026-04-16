import { prisma } from "../src/lib/prisma.js";
import { Role, Category } from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

const usersData = [
    { email: "admin@example.com", name: "Admin", role: Role.admin, password: "password123" },
    { email: "organisateur@example.com", name: "Marie Dupont", role: Role.orga, password: "password123" },
    { email: "utilisateur@example.com", name: "Jean Martin", role: Role.user, password: "password123" },
    { email: "john@example.com", name: "John Smith", role: Role.admin, password: "password123" },
    { email: "toufik@example.com", name: "Toufik Benali", role: Role.user, password: "password123" },
    { email: "nolan@example.com", name: "Nolan Girard", role: Role.user, password: "password123" },
    { email: "david@example.com", name: "David Moreau", role: Role.orga, password: "password123" },
    { email: "lucie@example.com", name: "Lucie Bernard", role: Role.user, password: "password123" },
    { email: "jerome@example.com", name: "Jérôme Petit", role: Role.visitor, password: "password123" },
    { email: "sophie@example.com", name: "Sophie Laurent", role: Role.user, password: "password123" },
];

const eventsData = [
    {
        title: "Concert Jazz au Sunset",
        description: "Une soirée jazz envoûtante avec les meilleurs musiciens parisiens.",
        date: new Date("2026-06-20T20:00:00Z"),
        venue: "Sunset Sunside",
        city: "Paris",
        price: 35,
        totalSeats: 100,
        category: Category.Concert,
        organizerEmail: "organisateur@example.com",
    },
    {
        title: "Conférence Tech Leaders",
        description: "Rencontrez les leaders de la tech française et européenne.",
        date: new Date("2026-07-10T09:00:00Z"),
        venue: "Centre de Congrès",
        city: "Lyon",
        price: 50,
        totalSeats: 200,
        category: Category.Conference,
        organizerEmail: "organisateur@example.com",
    },
    {
        title: "Festival Électro Summer",
        description: "Trois jours de musique électronique sur la plage.",
        date: new Date("2026-08-01T18:00:00Z"),
        venue: "Plage du Prado",
        city: "Marseille",
        price: 45,
        totalSeats: 500,
        category: Category.Festival,
        organizerEmail: "david@example.com",
    },
    {
        title: "Match de Gala",
        description: "Un match de football caritatif avec des anciens joueurs professionnels.",
        date: new Date("2026-05-30T15:00:00Z"),
        venue: "Stade Matmut Atlantique",
        city: "Bordeaux",
        price: 25,
        totalSeats: 150,
        category: Category.Sport,
        organizerEmail: "david@example.com",
    },
    {
        title: "Hamlet - Comédie Française",
        description: "La pièce de Shakespeare dans une mise en scène contemporaine.",
        date: new Date("2026-09-15T19:30:00Z"),
        venue: "Comédie Française",
        city: "Paris",
        price: 40,
        totalSeats: 80,
        category: Category.Theatre,
        organizerEmail: "organisateur@example.com",
    },
    {
        title: "Meetup Dev Web Paris",
        description: "Échanges autour des dernières tendances du développement web.",
        date: new Date("2026-05-05T18:30:00Z"),
        venue: "Station F",
        city: "Paris",
        price: 0,
        totalSeats: 60,
        category: Category.Conference,
        organizerEmail: "david@example.com",
    },
];

async function main() {
  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        ...u,
        password: await bcrypt.hash(u.password, 10),
      },
    });
  }
  console.log(`${usersData.length} users synchronisés avec succès.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
