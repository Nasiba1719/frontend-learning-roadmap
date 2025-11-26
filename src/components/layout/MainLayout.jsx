import { Suspense } from "react";
import { HeaderBar } from "./HeaderBar";

export function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="relative z-30 border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-black/40">
                <Suspense fallback={null}>
                    <HeaderBar />
                </Suspense>
            </header>
            <main className="mx-auto w-full max-w-7xl px-1 py-4 sm:px-4 sm:py-6 lg:px-6">
                {children}
            </main>
            <footer className="border-t border-zinc-200 bg-white/70 px-4 py-4 text-center text-xs text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-black/40 dark:text-zinc-400">
                Built with Next.js & Tailwind CSS
            </footer>
        </div>
    );
}

