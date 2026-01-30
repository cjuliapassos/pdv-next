"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const isActive = (path: string) => {
        return pathname === path
        ? "bg-blue-700 text-white"
        : "text-gray-300 hover:bg-blue-600 hover:text-white";
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Don't show navigation on login page
    if (pathname === "/") {
        return null;
    }

    return (
        <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                <span className="text-2xl">🏪</span>
                <span className="font-bold text-xl">Sistema PDV</span>
                </div>

                <div className="hidden md:flex items-center space-x-2 ml-10">
                <Link
                    href="/pos"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive(
                    "/pos"
                    )}`}
                >
                    🖥️ PDV
                </Link>

                <Link
                    href="/products"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive(
                    "/products"
                    )}`}
                >
                    📦 Produtos
                </Link>

                <Link
                    href="/sales"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${isActive(
                    "/sales"
                    )}`}
                >
                    💰 Vendas
                </Link>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {user && (
                <>
                    <div className="text-sm">
                    <span className="text-gray-300">Olá, </span>
                    <span className="font-medium">{user.name}</span>
                    </div>
                    <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                    >
                    Sair
                    </button>
                </>
                )}
            </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden pb-3 space-y-1">
            <Link
                href="/pos"
                className={`block px-4 py-2 rounded-md text-sm font-medium transition ${isActive(
                "/pos"
                )}`}
            >
                🖥️ PDV
            </Link>

            <Link
                href="/products"
                className={`block px-4 py-2 rounded-md text-sm font-medium transition ${isActive(
                "/products"
                )}`}
            >
                📦 Produtos
            </Link>

            <Link
                href="/sales"
                className={`block px-4 py-2 rounded-md text-sm font-medium transition ${isActive(
                "/sales"
                )}`}
            >
                💰 Vendas
            </Link>
            </div>
        </div>
        </nav>
    );
}

