export type Category = "Concert" | "Conference" | "Festival" | "Sport" | "Theatre" | "Autre";

export interface CreateEventDTO {
    title: string;
    description: string;
    date: string;
    venue: string;
    city: string;
    price: number;
    totalSeats: number;
    category: Category;
    image?: string;
}

export interface UpdateEventDTO {
    title?: string;
    description?: string;
    date?: string;
    venue?: string;
    city?: string;
    price?: number;
    totalSeats?: number;
    category?: Category;
    image?: string;
}

export interface EventFilters {
    category?: Category;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    upcoming?: boolean;
}
