export interface createTodosDTO {
    title: string;
    description?: string;
}

export interface updateTodosDTO {
    title?: string;
    description?: string;
    completed?: boolean;
}
