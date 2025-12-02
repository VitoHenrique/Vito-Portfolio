'use client';
import { motion } from 'framer-motion';

const technologies = [
    "Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "React", "Node.js", "PostgreSQL"
];

export default function TechMarquee() {
    return (
        <section className="py-10 bg-black overflow-hidden border-y border-white/5">
            <div className="flex relative mask-gradient">
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-16 whitespace-nowrap pr-16"
                >
                    {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="text-2xl md:text-4xl font-bold font-mono text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default select-none">
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
