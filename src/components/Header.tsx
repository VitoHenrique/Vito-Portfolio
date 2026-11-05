'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
        >
            <div className="flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-md md:backdrop-blur-xl bg-background/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <Link href="/" className="text-xl font-bold font-mono tracking-tighter relative group">
                    vito<span className="text-brand-a transition-transform duration-300 group-hover:scale-150 inline-block">.</span>dev
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {['Produtos', 'Diferencial', 'Contato'].map((item) => (
                        <MagneticButton key={item} strength={0.2} className="px-4 py-2 text-sm font-medium text-secondary hover:text-foreground transition-colors">
                            <Link href={`#${item === 'Diferencial' ? 'methodology' : item === 'Produtos' ? 'services' : 'contact'}`}>
                                {item}
                            </Link>
                        </MagneticButton>
                    ))}
                </nav>

                <MagneticButton strength={0.4}>
                    <Link href="#services">
                        <button className="px-5 py-2.5 text-sm font-bold bg-foreground text-background rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
                            Iniciar Projeto
                        </button>
                    </Link>
                </MagneticButton>
            </div>
        </motion.header>
    );
}
