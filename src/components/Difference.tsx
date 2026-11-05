'use client';
import { motion } from 'framer-motion';
import { Zap, Layers } from 'lucide-react';

export default function Difference() {
    return (
        <section id="methodology" className="py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Feature 1: The Hook */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 text-brand-a font-mono text-sm px-3 py-1 rounded-full bg-brand-a/10 border border-brand-a/20 w-fit">
                        <Zap className="w-4 h-4" />
                        <span>A velocidade é a nova moeda.</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold font-sans tracking-tight leading-tight">
                        Seu cliente não espera. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/50">Performance é inegociável.</span>
                    </h3>
                    <p className="text-secondary text-lg font-sans leading-relaxed">
                        Sites lentos perdem 40% do tráfego nos primeiros 3 segundos. Na Vito.dev, não entregamos apenas código; entregamos infraestrutura de venda blindada.
                    </p>

                    {/* Loading Bar Demo */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mt-8 backdrop-blur-sm shadow-2xl">
                        <div className="flex justify-between text-xs font-mono text-secondary mb-3">
                            <span>Carregando Assets...</span>
                            <span>100%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full bg-gradient-to-r from-brand-a to-brand-b shadow-[0_0_15px_rgba(62,207,142,0.5)]"
                            />
                        </div>
                        <div className="mt-6 flex gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]" />
                        </div>
                    </div>
                </motion.div>

                {/* Feature 2: Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 text-brand-b font-mono text-sm px-3 py-1 rounded-full bg-brand-b/10 border border-brand-b/20 w-fit">
                        <Layers className="w-4 h-4" />
                        <span>Powered by Modernity.</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold font-sans tracking-tight leading-tight">
                        Esqueça o WordPress <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/50">lento e inseguro.</span>
                    </h3>
                    <p className="text-secondary text-lg font-sans leading-relaxed">
                        Nós construímos o futuro. Interfaces fluidas e bancos de dados seguros que escalam com seu negócio.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mt-8">
                        {[
                            { title: "Google AntiGravity", desc: "Interfaces fluidas que reagem instantaneamente ao usuário.", color: "text-brand-b" },
                            { title: "Supabase", desc: "Banco de dados em nuvem com segurança nível bancário.", color: "text-brand-a" },
                            { title: "Vercel Edge Network", desc: "Seu site hospedado em servidores ao redor de todo o mundo.", color: "text-foreground" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors duration-300"
                            >
                                <div className={`text-lg font-bold ${item.color} mb-1 font-mono`}>{item.title}</div>
                                <div className="text-sm text-secondary font-sans">{item.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
