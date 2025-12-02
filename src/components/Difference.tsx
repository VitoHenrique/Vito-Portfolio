'use client';
import { motion } from 'framer-motion';
import { Zap, Layers } from 'lucide-react';

export default function Difference() {
    return (
        <section id="methodology" className="py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Feature 1: The Hook */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 text-brand-a font-mono text-sm">
                        <Zap className="w-4 h-4" />
                        <span>A velocidade é a nova moeda.</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-mono">
                        Seu cliente não espera. <br />
                        <span className="text-secondary">Performance é inegociável.</span>
                    </h3>
                    <p className="text-secondary text-lg font-sans">
                        Sites lentos perdem 40% do tráfego nos primeiros 3 segundos. Na Vito.dev, não entregamos apenas código; entregamos infraestrutura de venda blindada.
                    </p>

                    {/* Loading Bar Demo */}
                    <div className="p-6 rounded-xl bg-surface border border-white/5 mt-8">
                        <div className="flex justify-between text-xs font-mono text-secondary mb-2">
                            <span>Carregando Assets...</span>
                            <span>100%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="h-full bg-brand-a"
                            />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                    </div>
                </div>

                {/* Feature 2: Tech Stack */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 text-brand-b font-mono text-sm">
                        <Layers className="w-4 h-4" />
                        <span>Powered by Modernity.</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-mono">
                        Esqueça o WordPress <br />
                        <span className="text-secondary">lento e inseguro.</span>
                    </h3>
                    <p className="text-secondary text-lg font-sans">
                        Nós construímos o futuro. Interfaces fluidas e bancos de dados seguros.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mt-8">
                        <div className="p-4 rounded-lg bg-surface border border-white/5">
                            <div className="text-lg font-bold text-brand-b mb-1 font-mono">Google AntiGravity</div>
                            <div className="text-xs text-secondary font-sans">Interfaces fluidas que reagem instantaneamente ao usuário.</div>
                        </div>
                        <div className="p-4 rounded-lg bg-surface border border-white/5">
                            <div className="text-lg font-bold text-brand-a mb-1 font-mono">Supabase</div>
                            <div className="text-xs text-secondary font-sans">Banco de dados em nuvem com segurança nível bancário.</div>
                        </div>
                        <div className="p-4 rounded-lg bg-surface border border-white/5">
                            <div className="text-lg font-bold text-foreground mb-1 font-mono">Vercel Edge Network</div>
                            <div className="text-xs text-secondary font-sans">Seu site hospedado em servidores ao redor de todo o mundo.</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
