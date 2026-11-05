'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Por que pagar uma mensalidade em vez de pagar uma vez só?",
        answer: "No modelo tradicional, você paga caro em um site que fica desatualizado e inseguro em meses. No nosso modelo de assinatura, seu investimento é diluído e garantimos que seu site esteja sempre online, seguro, com backup em dia e rodando na velocidade máxima, sem que você precise pagar taxas extras de \"refação\" no futuro."
    },
    {
        question: "Em quanto tempo meu site fica pronto?",
        answer: "Velocidade é nosso sobrenome. Para o plano Cartão de Visita Digital (One Page), entregamos a primeira versão em até 5 dias úteis após o recebimento do material. Para sites institucionais completos, o prazo médio é de 5 a 20 dias."
    },
    {
        question: "Vocês usam WordPress ou Wix?",
        answer: "Não. Nós programamos \"na mão\" utilizando tecnologias de alta performance (o mesmo código usado por grandes startups). Sites em WordPress costumam ser lentos, pesados e alvos fáceis de vírus. Nós entregamos um site blindado, leve e que carrega instantaneamente no celular ou computador do seu cliente."
    },
    {
        question: "Meu site vai aparecer no Google?",
        answer: "Com certeza. O Google prioriza sites que carregam rápido e têm código limpo (exatamente o que fazemos). Toda nossa estrutura já nasce otimizada com as melhores práticas de SEO (Search Engine Optimization) para que sua empresa seja encontrada com facilidade na sua região."
    },
    {
        question: "E se eu precisar mudar o telefone ou uma foto depois?",
        answer: "Está tudo incluso! Diferente de outras agências que cobram por cada vírgula alterada, no seu plano mensal você tem direito a pequenas atualizações de texto e imagem. Basta chamar nosso suporte no WhatsApp e nós resolvemos para você, geralmente no mesmo dia."
    },
    {
        question: "Como funciona o registro do domínio (www.minhaempresa.com.br)?",
        answer: "Pela nossa política de \"Risco Zero\", o domínio é registrado e gerenciado pela Vito.dev durante a vigência da sua assinatura. Isso garante que ele nunca expire por falta de pagamento e que a configuração técnica esteja sempre correta. Caso você decida encerrar a parceria no futuro, a titularidade é transferida para você mediante o cumprimento do aviso prévio e das regras contratuais."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans">Perguntas Frequentes</h2>
                    <p className="text-secondary">
                        Tire suas dúvidas sobre como trabalhamos.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white/5 border border-white/5 overflow-hidden transition-colors duration-300 hover:border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-medium font-sans text-lg">{faq.question}</span>
                                <span className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-secondary leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
