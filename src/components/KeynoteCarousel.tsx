"use client";

import { useEffect, useState } from "react";

const slides = [
    {
        image: "/key note 1.jpg",
        tag: "KEYNOTE",
        title: "Smart Cities Summit 2024",
        desc: 'Keynote Speaker: "Data-Driven Urbanism"',
    },
    {
        image: "/key note 2.jpg",
        tag: "PANEL",
        title: "Transport Innovation Hub",
        desc: 'Expert Panel: "The Future of Simulation"',
    },
    {
        image: "/key note 3.jpg",
        tag: "WORKSHOP",
        title: "Urban Future Conference",
        desc: 'Leading Workshop: "Agents of Change"',
    },
];

export default function KeynoteCarousel() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div
            className="keynote-carousel relative w-full h-full overflow-hidden rounded-[15px] min-h-[350px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`carousel-slide absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ backgroundImage: `url('${slide.image}')` }}
                >
                    <div className="carousel-content absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/95 via-black/70 to-transparent z-[2]" style={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '50px', paddingRight: '40px' }}>
                        <span className="media-tag inline-block mb-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded border border-white/20 text-xs font-mono text-white">
                            {slide.tag}
                        </span>
                        <h3 className="text-2xl font-bold text-white drop-shadow-md mb-1">
                            {slide.title}
                        </h3>
                        <p className="text-gray-300 text-sm drop-shadow-sm">{slide.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
