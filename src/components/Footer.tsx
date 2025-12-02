'use client';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TextType from './TextType';

export default function Footer() {
    return (
        <footer id="contact" className="py-24 px-6 border-t border-white/5 bg-surface/30">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 font-sans tracking-tighter">
                    Sua empresa parou em 2015? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-a to-brand-b">
                        <TextType
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
                    </span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                    <button className="px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 cursor-pointer">
                        Solicitar Orçamento via WhatsApp
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5 text-sm text-secondary">
                    <div className="font-mono">
                        vito<span className="text-brand-a">.</span>dev © {new Date().getFullYear()}. Code never lies. Feito em São José do Rio Preto, SP.
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-foreground transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
