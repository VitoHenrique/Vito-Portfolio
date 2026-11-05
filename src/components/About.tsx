'use client';
import { motion } from 'framer-motion';
import { Code2, Coffee, ShieldCheck, Cpu } from 'lucide-react';

const stats = [
    {
        label: "Anos de Experiência",
        value: "5+",
        icon: Code2,
        color: "text-brand-a"
    },
    {
        label: "Satisfação Garantida",
        value: "100%",
        icon: ShieldCheck,
        color: "text-brand-b"
    },
    {
        label: "Cafés Consumidos",
        value: "∞",
        icon: Coffee,
        color: "text-yellow-500"
    },
    {
        label: "Stack Atual",
        value: "Next.js 15",
        icon: Cpu,
        color: "text-cyan-400"
    }
];

export default function About() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans tracking-tight">
                            Mais do que código. <br />
                            <span className="text-secondary">Criamos experiências digitais.</span>
                        </h2>
                        <p className="text-secondary text-lg font-sans leading-relaxed mb-8">
                            Acreditamos que a web deve ser rápida, bonita e funcional. Não somos apenas desenvolvedores; somos arquitetos de soluções digitais que impulsionam o seu negócio.
                            Combinamos design de ponta com engenharia robusta para entregar produtos que se destacam no mercado.
                        </p>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-sm font-mono text-brand-a mb-2">Curiosidade_</p>
                            <p className="text-secondary/80 italic">
                                "O primeiro site que criei foi em 2018. Desde então, a web mudou drasticamente, e eu mudei com ela. Hoje, foco 100% em performance e experiência do usuário."
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group"
                            >
                                <stat.icon className={`w-8 h-8 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                                <div className="text-3xl font-bold font-mono mb-1">{stat.value}</div>
                                <div className="text-sm text-secondary font-sans">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
