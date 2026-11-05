'use client';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import TextType from './TextType';
import ColorBends from './ColorBends';
import MagneticButton from './ui/MagneticButton';

export default function Hero() {
    const [copied, setCopied] = useState(false);
    const command = "npx create-vito-app";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        show: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 relative overflow-hidden">
            {/* Background Fluid Effect - Desktop Only */}
            <div className="absolute inset-0 -z-10 opacity-30 hidden md:block">
                <ColorBends
                    colors={['#000000', '#1a1a1a', '#3ecf8e', '#000000', '#7928CA', '#000000']}
                    speed={0.12}
                    noise={0.15}
                    warpStrength={1.8}
                />
            </div>

            {/* Mobile Static Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-surface to-background block md:hidden" />

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background -z-10" />

            {/* Ambient Glow - Desktop Only */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-a/5 rounded-full blur-[120px] -z-10 pointer-events-none hidden md:block" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="text-center max-w-6xl mx-auto space-y-10 relative z-10"
            >
                <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-a mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(62,207,142,0.1)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-a opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-a"></span>
                    </span>
                    Disponível para novos projetos
                </motion.div>

                <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] font-sans text-balance">
                    Engenharia de Performance para <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-a to-brand-b inline-block pb-2 md:hidden">
                        Sistemas de Alta Escala
                    </span>
                    <span className="hidden md:inline-block">
                        <TextType
                            as="span"
                            className="text-transparent bg-clip-text bg-gradient-to-r from-brand-a to-brand-b inline-block pb-2 min-h-[1.1em]"
                            text={["Negócios Ambiciosos", "Startups em Crescimento", "Produtos Digitais", "Sistemas de Alta Escala"]}
                            typingSpeed={80}
                            deletingSpeed={40}
                            pauseDuration={2000}
                            loop={true}
                            showCursor={true}
                            cursorCharacter="|"
                            cursorClassName="text-brand-a ml-1 animate-pulse font-light"
                        />
                    </span>
                </motion.h1>

                <motion.p variants={item} className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto font-sans text-balance leading-relaxed">
                    Transformamos problemas complexos em receita. Sites e Sistemas ultra-rápidos equipados com a nova stack da web
                    (<span className="text-foreground font-medium border-b border-brand-a/30">Supabase</span> & <span className="text-foreground font-medium border-b border-brand-b/30">AntiGravity</span>).
                </motion.p>

                <motion.div variants={item} className="pt-8 flex flex-col items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <MagneticButton strength={0.4}>
                            <Link href="#services">
                                <button
                                    className="group relative px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
                                >
                                    <span className="relative z-10">Iniciar Projeto</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-a to-brand-b opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                </button>
                            </Link>
                        </MagneticButton>

                        {/* <MagneticButton strength={0.4}>
                            <button
                                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 font-medium text-lg backdrop-blur-md transition-all duration-300 hover:border-white/20"
                            >
                                Ver nossa Stack
                            </button>
                        </MagneticButton> */}
                    </div>

                    <motion.div
                        variants={item}
                        className="group flex items-center gap-3 text-xs text-secondary/60 font-mono mt-4 px-5 py-2.5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-xl cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                        onClick={handleCopy}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Terminal size={14} className="group-hover:text-brand-a transition-colors" />
                        <span className="group-hover:text-foreground transition-colors">{command}</span>
                        {copied ? <Check size={14} className="text-brand-a" /> : <Copy size={14} className="group-hover:text-foreground transition-colors" />}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
