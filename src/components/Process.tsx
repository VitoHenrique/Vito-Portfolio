'use client';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "Mergulhamos no seu negócio para entender seus objetivos, público-alvo e desafios. Definimos o escopo e a estratégia ideal."
    },
    {
        number: "02",
        title: "Design & UX",
        description: "Criamos protótipos de alta fidelidade focados na experiência do usuário. Visualizamos o produto final antes de escrever uma linha de código."
    },
    {
        number: "03",
        title: "Development",
        description: "Codificação com as tecnologias mais modernas (Next.js, React, Tailwind). Foco total em performance, SEO e escalabilidade."
    },
    {
        number: "04",
        title: "Launch & Scale",
        description: "Deploy global na Vercel. Monitoramento de performance e ajustes finais para garantir um lançamento perfeito."
    }
];

export default function Process() {
    return (
        <section className="py-24 px-6 relative bg-black/20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans">Nosso Processo</h2>
                    <p className="text-secondary max-w-xl mx-auto">
                        Uma metodologia comprovada para transformar ideias em produtos digitais de sucesso.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-brand-a/0 via-brand-a/20 to-brand-a/0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative pt-8 group"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-brand-a z-10 group-hover:scale-125 group-hover:bg-brand-a transition-all duration-300 shadow-[0_0_10px_rgba(62,207,142,0.5)]" />

                            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-a/30 transition-colors duration-300 h-full overflow-hidden">
                                {/* Watermark Number */}
                                <div className="absolute -top-6 -right-6 text-9xl font-bold text-white/[0.03] font-mono select-none group-hover:text-white/[0.08] transition-colors duration-300 pointer-events-none">
                                    {step.number}
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-4 font-sans group-hover:text-brand-a transition-colors">{step.title}</h3>
                                    <p className="text-secondary text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
