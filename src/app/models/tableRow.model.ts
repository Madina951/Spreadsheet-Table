export type Existance = 'В наличии' | 'Нет в наличии';

export type TableRow = {
    brand: string;
    article: string;
    name: string;
    cost: number;
    isExistence: Existance;
    country: string;
    year: number;
}