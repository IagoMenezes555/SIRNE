export interface Menu {
    day: string;
    idSnack: string;
    idLunch: string;
    id: string;
}

export interface MenuDatabase {
    name: string;
    calories: number;
    carbohydrates: number;
    lactose: boolean;
    glucose: number;
    id: string;
    objectId: string;
    type: 'snack' | 'lunch';
}

export interface Meal {
    name: string;
    calories: number;
    carbohydrates: number;
    lactose: boolean;
    glucose: number;
    objectId: string;
    id: string;
    assessment: number;
}