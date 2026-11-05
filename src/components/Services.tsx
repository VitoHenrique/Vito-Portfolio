'use client';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import MagneticButton from './ui/MagneticButton';

const plans = [
    {
        name: "Pacote Inicial",
        subtitle: "Cartão de Visita Digital",
        idealFor: "Autônomos, Barbearias, Delivery e Profissionais Liberais.",
        description: "Sua porta de entrada na internet. Um site de página única, ultra-rápido, projetado para converter visitantes em mensagens no WhatsApp.",
        features: [
            "Site One-Page (Página Única)",
            "Botão Flutuante 'Chamar no WhatsApp'",
            "Integração com Google Maps e Waze",
            "Hospedagem de Alta Performance inclusa",
            "Atualizações mensais de texto/fotos"
        ],
        investment: {
            setup: "R$ 200,00",
            monthly: "R$ 99,90"
        },
        cta: "Assinar Agora",
        link: "https://wa.me/5521959020656?text=Ol%C3%A1%2C%20Vito!%20Tenho%20interesse%20no%20plano%20*Cart%C3%A3o%20de%20Visita%20Digital*.%20Como%20funcionam%20os%20pr%C3%B3ximos%20passos%3F",
        highlight: false
    },
    {
        name: "Pacote Pro",
        subtitle: "Site Institucional Completo",
        idealFor: "Clínicas, Escritórios de Advocacia/Engenharia e Empresas Locais.",
        description: "Transmita autoridade. Um site completo com múltiplas páginas para apresentar seus serviços, equipe e diferenciais com o máximo de profissionalismo.",
        features: [
            "Tudo do plano anterior",
            "Até 5 Páginas (Home, Sobre, Serviços, Blog, Contato)",
            "Otimização para aparecer no Google (SEO Básico)",
            "Área de Notícias gerenciável",
            "E-mails profissionais personalizados",
            "Suporte Técnico Prioritário"
        ],
        investment: {
            setup: "R$ 400,00",
            monthly: "R$ 199,90"
        },
        cta: "Assinar Plano Pro",
        link: "https://wa.me/5521959020656?text=Ol%C3%A1!%20Quero%20profissionalizar%20minha%20empresa%20com%20o%20plano%20*Institucional%20Pro*.%20Podemos%20fechar%3F",
        highlight: true
    },
    {
        name: "Pacote Enterprise",
        subtitle: "Vito System (Sob Medida)",
        idealFor: "Startups, Gestão de Estoque, Painéis Financeiros e SaaS.",
        description: "Transforme planilhas em um sistema web seguro. Tenha controle total da sua operação com dados em tempo real e acesso restrito.",
        features: [
            "Sistema de Login e Senha Seguro (Auth)",
            "Painel Administrativo (Dashboard) com Gráficos",
            "Gestão de Usuários (Admin vs. Funcionário)",
            "Banco de Dados em Tempo Real",
            "Consultoria de Processos"
        ],
        investment: {
            setup: "A partir de R$ 1.000,00",
            monthly: "Sob Consulta"
        },
        cta: "Solicitar Orçamento",
        link: "https://wa.me/5521959020656?text=Ol%C3%A1%2C%20Vito.%20Preciso%20de%20um%20*Sistema%20de%20Gest%C3%A3o*%20personalizado%20para%20minha%20empresa.%20Gostaria%20de%20agendar%20um%20diagn%C3%B3stico.",
        highlight: false
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans tracking-tight">
                        Tecnologia de Ponta, <span className="text-brand-a">Custo Acessível.</span> <br />
                        Escolha o plano ideal para o seu momento.
                    </h2>
                    <p className="text-secondary max-w-2xl mx-auto text-lg">
                        Sem surpresas. Uma taxa única de implantação e uma mensalidade fixa para manter sua empresa sempre online, segura e atualizada.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-a/5 blur-[120px] -z-10 pointer-events-none" />

                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col h-full ${plan.highlight
                                ? 'bg-white/10 border-brand-a/50 shadow-[0_0_40px_rgba(62,207,142,0.15)] scale-105 z-10'
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-a text-background text-xs font-bold uppercase tracking-wider">
                                    Recomendado
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-sm font-mono text-brand-a mb-2">{plan.name}</h3>
                                <div className="text-2xl font-bold font-sans mb-4">{plan.subtitle}</div>
                                <p className="text-xs text-secondary/80 mb-4 font-mono border-l-2 border-white/10 pl-3">
                                    Ideal para: {plan.idealFor}
                                </p>
                                <p className="text-secondary text-sm leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="flex-grow mb-8">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                                            <Check className="w-5 h-5 text-brand-a shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-xs text-secondary mb-1">Implantação (Única)</div>
                                        <div className="text-lg font-bold">{plan.investment.setup}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-secondary mb-1">Mensalidade</div>
                                        <div className="text-xl font-bold text-brand-a">{plan.investment.monthly}</div>
                                    </div>
                                </div>

                                <MagneticButton strength={0.3} className="w-full">
                                    <Link href={plan.link} target="_blank">
                                        <button className={`w-full py-4 px-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 whitespace-normal h-auto min-h-[60px] flex items-center justify-center ${plan.highlight
                                            ? 'bg-brand-a text-background hover:bg-brand-a/90 hover:shadow-[0_0_20px_rgba(62,207,142,0.4)]'
                                            : 'bg-white/10 hover:bg-white/20 text-foreground'
                                            }`}>
                                            {plan.cta}
                                        </button>
                                    </Link>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 text-center p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="p-3 rounded-full bg-brand-a/10 text-brand-a">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Contrato de Performance</h4>
                        <p className="text-secondary text-sm">
                            Se o site sair do ar, você não paga a mensalidade. Garantia de estabilidade e segurança total com tecnologia de ponta.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
