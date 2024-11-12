export interface Offer {
    id: number;
    discount: number;
    start_date: Date;
    end_date?: Date;  // Usa ? para indicar que es opcional
}
