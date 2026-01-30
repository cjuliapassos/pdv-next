export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    barcode?: string;
}

export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    barcode?: string;
}
