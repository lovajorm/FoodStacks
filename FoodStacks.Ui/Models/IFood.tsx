export interface IFood {
    id: number
    title: string
    category: Category
    bestBefore: Date
}

export enum Category {
    Fridge,
    Freezer,
    Pantry
}