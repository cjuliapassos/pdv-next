import { create } from 'zustand';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, quantity } : item)
    })),
    clearCart: () => set({ items: [] }),
    total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
