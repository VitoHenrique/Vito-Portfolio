'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-white/5"
        >
            <Link href="/" className="text-xl font-bold font-mono tracking-tighter">
                vito<span className="text-brand-a">.</span>dev
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
                <Link href="#services" className="hover:text-foreground transition-colors">Produtos</Link>
                <Link href="#methodology" className="hover:text-foreground transition-colors">Diferencial</Link>
                <Link href="#contact" className="hover:text-foreground transition-colors">Contato</Link>
            </nav>

            <button className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:border-brand-a hover:text-brand-a hover:shadow-[0_0_15px_rgba(62,207,142,0.3)] transition-all duration-300 cursor-pointer">
                Iniciar Projeto
            </button>
        </motion.header>
    );
}
