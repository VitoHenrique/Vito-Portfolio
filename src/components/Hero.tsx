'use client';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import TextType from './TextType';

export default function Hero() {
    const [copied, setCopied] = useState(false);
    const command = "npx create-vito-app";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-b/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-6xl mx-auto space-y-6"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-a mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-a opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-a"></span>
                    </span>
                    Disponível para novos projetos
                </div>

                Engenharia de Performance para <TextType
                    as="span"
                    className="text-brand-a md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-brand-a md:to-brand-b inline"
                    text={["Negócios Ambiciosos", "Startups em Crescimento", "Produtos Digitais", "Sistemas de Alta Escala"]}
                    typingSpeed={150}
                    deletingSpeed={75}
                    pauseDuration={3000}
                    loop={true}
                    showCursor={true}
                    cursorCharacter="|"
                    cursorClassName="text-brand-a ml-1"
                />.

                <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-sans">
                    Transformamos problemas complexos em receita. Sites e Sistemas ultra-rápidos equipados com a nova stack da web <br />
                    (<span className="text-brand-a font-medium">Supabase</span> & <span className="text-brand-b font-medium">AntiGravity</span>).
                </p>

                <div className="pt-8 flex flex-col items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            Iniciar Projeto _
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 font-medium text-lg transition-all duration-300"
                        >
                            Ver nossa Stack &gt;
                        </motion.button>
                    </div>
                    <p className="text-xs text-secondary/60 font-mono mt-4 max-w-md">
                        Tecnologia utilizada por startups do Vale do Silício, agora em São José do Rio Preto.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
