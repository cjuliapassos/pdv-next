"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cart.store";
import { Product } from "@/features/products/types";

export default function POSPage() {
    const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCartStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "pix">("cash");
    const [searchTerm, setSearchTerm] = useState("");

  // Mock products - In production, this would come from an API
    const availableProducts: Product[] = [
        { id: "1", name: "Coca-Cola 2L", description: "Refrigerante", price: 8.99, stock: 50, category: "Bebidas", barcode: "7894900011111" },
        { id: "2", name: "Arroz 5kg", description: "Arroz branco tipo 1", price: 25.90, stock: 30, category: "Alimentos", barcode: "7894900022222" },
        { id: "3", name: "Feijão 1kg", description: "Feijão preto", price: 9.50, stock: 40, category: "Alimentos", barcode: "7894900033333" },
        { id: "4", name: "Sabão em Pó 1kg", description: "Sabão em pó", price: 12.90, stock: 25, category: "Limpeza", barcode: "7894900044444" },
        { id: "5", name: "Água 500ml", description: "Água mineral", price: 2.50, stock: 100, category: "Bebidas", barcode: "7894900055555" },
    ];

    const filteredProducts = availableProducts.filter(
        (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode?.includes(searchTerm)
    );

    const handleAddToCart = (product: Product) => {
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
        updateQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) {
        alert("Carrinho vazio!");
        return;
        }
        setIsCheckoutOpen(true);
    };

    const handleCompleteSale = () => {
        alert(`Venda finalizada!\nTotal: R$ ${total().toFixed(2)}\nForma de pagamento: ${paymentMethod}`);
        clearCart();
        setIsCheckoutOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🖥️ Ponto de Venda (PDV)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-4">
                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="🔍 Buscar produto por nome ou código de barras..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                />
                </div>

                {/* Products Grid */}
                <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Produtos Disponíveis</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                    {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleAddToCart(product)}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition"
                    >
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <div className="mt-2 flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                            R$ {product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                            Estoque: {product.stock}
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Cart Section */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow sticky top-4">
                <div className="p-4 bg-blue-600 text-white rounded-t-lg">
                    <h2 className="text-xl font-semibold">🛒 Carrinho</h2>
                </div>

                <div className="p-4">
                    {items.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Carrinho vazio
                    </div>
                    ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-3"
                        >
                            <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                                R$ {item.price.toFixed(2)} x {item.quantity}
                            </p>
                            </div>
                            <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                updateQuantity(item.id, Math.max(0, item.quantity - 1))
                                }
                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                -
                            </button>
                            <span className="w-8 text-center font-bold">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="ml-2 text-red-600 hover:text-red-800"
                            >
                                🗑️
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}

                    {/* Total */}
                    <div className="mt-6 pt-4 border-t-2">
                    <div className="flex justify-between text-2xl font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">R$ {total().toFixed(2)}</span>
                    </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 space-y-2">
                    <button
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                        💳 Finalizar Venda
                    </button>
                    <button
                        onClick={clearCart}
                        disabled={items.length === 0}
                        className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                        🗑️ Limpar Carrinho
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Checkout Modal */}
        {isCheckoutOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">💳 Finalizar Venda</h2>

                <div className="mb-6">
                <h3 className="font-semibold mb-3">Itens da Venda:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                    {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>
                        {item.quantity}x {item.name}
                        </span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    ))}
                </div>
                </div>

                <div className="mb-6 pb-6 border-b">
                <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {total().toFixed(2)}</span>
                </div>
                </div>

                <div className="mb-6">
                <h3 className="font-semibold mb-3">Forma de Pagamento:</h3>
                <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(e) => setPaymentMethod(e.target.value as "cash")}
                        className="mr-3"
                    />
                    <span>💵 Dinheiro</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value as "card")}
                        className="mr-3"
                    />
                    <span>💳 Cartão</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                        type="radio"
                        name="payment"
                        value="pix"
                        checked={paymentMethod === "pix"}
                        onChange={(e) => setPaymentMethod(e.target.value as "pix")}
                        className="mr-3"
                    />
                    <span>📱 PIX</span>
                    </label>
                </div>
                </div>

                <div className="flex gap-3">
                <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleCompleteSale}
                    className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                >
                    Confirmar
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    }
