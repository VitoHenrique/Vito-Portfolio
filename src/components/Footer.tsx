'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TextType from './TextType';

export default function Footer() {
    return (
        <footer id="contact" className="py-24 px-6 border-t border-white/5 bg-surface/30">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 font-sans tracking-tighter text-balance">
                    Sua empresa parou em 2015? <br />
                    <TextType
                        as="span"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-brand-a to-brand-b inline"
                        text={[
                            "Atualize sua realidade digital hoje.",
                            "Domine o mercado com velocidade.",
                            "Escale seu negócio com tecnologia.",
                            "Transforme visitantes em clientes."
                        ]}
                        typingSpeed={150}
                        deletingSpeed={75}
                        pauseDuration={3000}
                        loop={true}
                        showCursor={true}
                        cursorCharacter="|"
                        cursorClassName="text-brand-a ml-1"
                    />
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                    <Link href="http://wa.me/5521959020656" target="_blank">
                        <button className="px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 cursor-pointer">
                            Solicitar Orçamento via WhatsApp
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>

                <div className="flex items-center justify-center pt-8 border-t border-white/5 text-sm text-secondary">
                    <div className="flex items-center gap-2 font-mono">
                        <Image
                            src="/logo.png"
                            alt="Vito.dev Logo"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain opacity-80"
                        />
                        <span>vito.dev © {new Date().getFullYear()}. Code never lies. Feito em São José do Rio Preto, SP.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
