'use client';
import { motion } from 'framer-motion';
import { Layout, Building2, Database } from 'lucide-react';
import { MagicBento, ParticleCard } from './MagicBento';

const services = [
    {
        title: "Landing Page High-Speed",
        description: "Página única focada em uma coisa: transformar visitantes em clientes. Carregamento instantâneo para campanhas de tráfego pago.",
        icon: Layout,
        features: ["Carregamento < 1s (AntiGravity)", "Mobile-First Absoluto", "Integração WhatsApp Direta"],
        gradient: "from-brand-a/20 to-transparent",
        tag: "Para Conversão"
    },
    {
        title: "Institucional Pro",
        description: "A vitrine digital da sua empresa. Estrutura robusta para SEO, blog e gestão de conteúdo sem depender de desenvolvedores.",
        icon: Building2,
        features: ["CMS Integrado (Gestão Fácil)", "Otimização SEO Técnica", "Segurança Enterprise"],
        gradient: "from-blue-500/20 to-transparent",
        tag: "Para Autoridade"
    },
    {
        title: "Vito System",
        description: "Dashboards, áreas de membros e sistemas de gestão. Onde os dados da sua empresa ganham vida em tempo real.",
        icon: Database,
        features: ["Autenticação Segura (Supabase Auth)", "Dados em Tempo Real", "Níveis de Acesso (Admin/User)"],
        gradient: "from-brand-b/20 to-transparent",
        tag: "Para Escala"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans">Nossos Produtos</h2>
                    <p className="text-secondary max-w-xl font-sans">
                        Escolha o nível de infraestrutura ideal para o seu momento atual.
                    </p>
                </div>

                <MagicBento
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="62, 207, 142"
                >
                    {services.map((service, index) => (
                        <ParticleCard
                            key={index}
                            className="magic-bento-card magic-bento-card--border-glow"
                            style={{ backgroundColor: '#121212' }}
                            glowColor="62, 207, 142"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className="w-6 h-6 text-foreground" />
                            </div>

                            <h3 className="text-xl font-bold mb-3 font-sans">{service.title}</h3>
                            <p className="text-secondary text-sm mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-xs font-mono text-secondary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-a mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </ParticleCard>
                    ))}
                </MagicBento>
            </div>
        </section>
    );
}
