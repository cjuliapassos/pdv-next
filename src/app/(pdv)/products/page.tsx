"use client";

import { useState } from "react";
import { Product } from "@/features/products/types";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        barcode: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        };

        if (editingProduct) {
        // Update product
        setProducts(
            products.map((p) =>
            p.id === editingProduct.id ? { ...productData, id: p.id } : p
            )
        );
        } else {
        // Create new product
        const newProduct = {
            ...productData,
            id: Date.now().toString(),
        };
        setProducts([...products, newProduct]);
        }

        handleCloseModal();
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        barcode: product.barcode || "",
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Tem certeza que deseja remover este produto?")) {
        setProducts(products.filter((p) => p.id !== id));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        barcode: "",
        });
    };

    return (
        <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">📦 Gestão de Produtos</h1>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
            + Novo Produto
            </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum produto cadastrado. Clique em "Novo Produto" para começar.
                    </td>
                </tr>
                ) : (
                products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                        {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                        {product.description}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span
                        className={`px-2 py-1 text-xs rounded-full ${
                            product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        >
                        {product.stock} un.
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.barcode || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                        Editar
                        </button>
                        <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                        >
                        Remover
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
            onClick={handleCloseModal}
            >
            <div 
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto *
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição *
                    </label>
                    <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preço (R$) *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={formData.price}
                        onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estoque *
                    </label>
                    <input
                        type="number"
                        min="0"
                        required
                        value={formData.stock}
                        onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código de Barras
                    </label>
                    <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) =>
                        setFormData({ ...formData, barcode: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                    {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* Permission Notice */}
        <div className="mt-4 text-sm text-gray-500 text-center">
            🔒 Acesso restrito a administradores e gerentes
        </div>
        </div>
    );
    }
