"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SLIDES = [
    {
        id: 1,
        title: "Trendyol-a 1001 sevinç gəldi!",
        description:
            "Endirimli məhsullar, sürətli çatdırılma və xüsusi kampaniyalar sənin üçün.",
        cta: "BAXTINI SINA",
        href: "/",
        gradient:
            "from-[#291b5a] via-[#432874] to-[#6d2fa0]", // bənzər bənövşəyi fon
    },
    {
        id: 2,
        title: "Elektronika məhsullarında super fürsətlər",
        description: "Telefon, noutbuk, qulaqlıq və daha çoxu xüsusi qiymətlərlə.",
        cta: "Elektronika",
        href: "/?category=electronics",
        gradient: "from-[#001f3f] via-[#003566] to-[#00509d]",
    },
    {
        id: 3,
        title: "Geyim kateqoriyalarında yeni gələnlər",
        description: "Sevdiyin brendlər, gündəlik və sport dəstlər bir arada.",
        cta: "Geyimlərə keç",
        href: "/?category=men%27s%20clothing",
        gradient: "from-[#7b2cbf] via-[#9d4edd] to-[#c77dff]",
    },
];

export function HeroSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const current = SLIDES[index];

    const goTo = (nextIndex) => {
        if (nextIndex < 0) nextIndex = SLIDES.length - 1;
        if (nextIndex >= SLIDES.length) nextIndex = 0;
        setIndex(nextIndex);
    };

    return (
        <section className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r text-white shadow-md sm:rounded-3xl">
            <div
                className={`flex h-40 items-center justify-between px-4 sm:h-52 sm:px-8 lg:h-64 lg:px-10 bg-gradient-to-r ${current.gradient}`}
            >
                <div className="max-w-xl space-y-2 sm:space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-orange-300">
                        kampaniya
                    </p>
                    <h2 className="text-lg font-bold leading-tight sm:text-2xl lg:text-3xl">
                        {current.title}
                    </h2>
                    <p className="hidden text-xs text-zinc-100 sm:block sm:text-sm">
                        {current.description}
                    </p>
                    <Link
                        href={current.href}
                        className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-2 text-xs font-semibold tracking-wide text-white shadow hover:bg-pink-400 sm:text-sm"
                    >
                        {current.cta}
                    </Link>
                </div>

                <div className="hidden pr-4 text-5xl sm:block lg:text-7xl">
                    🎁
                </div>
            </div>

            <button
                type="button"
                onClick={() => goTo(index - 1)}
                className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 sm:flex"
            >
                ‹
            </button>
            <button
                type="button"
                onClick={() => goTo(index + 1)}
                className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 sm:flex"
            >
                ›
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {SLIDES.map((slide, i) => (
                    <button
                        key={slide.id}
                        type="button"
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}


