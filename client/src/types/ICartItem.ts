export interface ICartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total?: number;
    image: string;
}