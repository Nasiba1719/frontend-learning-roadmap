"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function HeaderBar() {
    const { cartCount } = useCart();
    const { user, login, logout } = useAuth();
    const { isDark, toggle } = useDarkMode();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const [showAuthBox, setShowAuthBox] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuthClick = useCallback(() => {
        if (user) {
            logout();
            setShowAuthBox(false);
        } else {
            setShowAuthBox((prev) => !prev);
        }
    }, [user, logout]);

    const handleLoginSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!email.trim()) return;
            login(email.trim());
            setShowAuthBox(false);
            setPassword("");
        },
        [email, login]
    );

    const handleSearchSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const params = new URLSearchParams(searchParams.toString());
            if (search) {
                params.set("search", search);
            } else {
                params.delete("search");
            }
            const query = params.toString();
            router.push(query ? `${pathname}?${query}` : pathname);
        },
        [router, pathname, search, searchParams]
    );

    return (
        <div className="relative mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
            <Link
                href="/"
                className="text-2xl font-semibold tracking-tight lowercase"
            >
                <span className="text-black">trendy</span>
                <span className="text-orange-500">ol</span>
            </Link>

            <form onSubmit={handleSearchSubmit} className="flex-1">
                <div className="flex items-center overflow-hidden rounded-full bg-zinc-100 text-sm text-zinc-700 shadow-inner dark:bg-zinc-900 dark:text-zinc-200">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Aradığınız ürün, kategori veya markayı yazınız"
                        className="flex-1 bg-transparent px-4 py-2 outline-none"
                    />
                    <button
                        type="submit"
                        className="flex h-10 w-10 items-center justify-center text-orange-500"
                    >
                        <span className="text-lg">🔍</span>
                    </button>
                </div>
            </form>

            <div className="flex items-center gap-4 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                <button
                    type="button"
                    onClick={toggle}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    aria-label="Dark mode toggle"
                >
                    {isDark ? "🌙" : "☀️"}
                </button>
                <button
                    onClick={handleAuthClick}
                    className="flex items-center gap-2 hover:text-orange-500"
                >
                    <span className="text-lg">👤</span>
                    <span>{user ? "Çıxış et" : "Giriş et"}</span>
                </button>
                {user && (
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-[12px] font-semibold uppercase text-white">
                            {(user.name || user.email || "?").charAt(0)}
                        </div>
                    </div>
                )}
                <Link
                    href="/favorites"
                    className="flex items-center gap-2 hover:text-orange-500"
                >
                    <span className="text-lg">♡</span>
                    <span>Favoritlər</span>
                </Link>
                <Link
                    href="/cart"
                    className="flex items-center gap-2 hover:text-orange-500"
                >
                    <span className="text-lg">🛒</span>
                    <span>
                        Səbət{" "}
                        <span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                            {cartCount}
                        </span>
                    </span>
                </Link>
            </div>

            {!user && showAuthBox && (
                <div className="absolute right-4 top-full z-20 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-4 text-xs shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                        Giriş et
                    </p>
                    <form onSubmit={handleLoginSubmit} className="space-y-2">
                        <div className="space-y-1">
                            <label className="block text-[11px] text-zinc-500">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-[11px] outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[11px] text-zinc-500">
                                Şifrə
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-[11px] outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-1 w-full rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-orange-400"
                        >
                            Daxil ol
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}


