import React, { useEffect, useRef } from "react";

export default function Starfield() {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        let w, h, raf, stars = [];

        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            const count = Math.min(400, Math.floor((w * h) / 4000));
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * 0.7 + 0.3,
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.3 + 0.05,
                a: Math.random() * 0.5 + 0.5
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars) {
                s.x += s.vx * s.z;
                s.y += s.vy * s.z;
                if (s.y > h) { s.y = -2; s.x = Math.random() * w; }
                const r = 0.8 + s.z * 1.2;
                ctx.globalAlpha = s.a;
                ctx.beginPath();
                ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
                ctx.fillStyle = "#eafaff";
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(draw);
        };

        init();
        window.addEventListener("resize", init);
        raf = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", init);
        };
    }, []);

    return <canvas className="starfield" ref={ref} aria-hidden="true" />;
}
