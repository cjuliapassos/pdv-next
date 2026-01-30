export interface SaleItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface Sale {
    id: string;
    items: SaleItem[];
    total: number;
    paymentMethod: 'cash' | 'card' | 'pix';
    createdAt: Date;
    customerId?: string;
}

export interface CreateSaleInput {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    paymentMethod: 'cash' | 'card' | 'pix';
    customerId?: string;
}
