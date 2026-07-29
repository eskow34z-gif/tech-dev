"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn, SectionDivider } from "@/components/ui/motion";

const faqs = [
  {
    question: "Combien coûte un site vitrine ?",
    answer:
      "À partir de 350€ pour une page unique, 500€ pour un site 3-5 pages. Le tarif dépend de vos besoins précis — vous recevez un devis clair sous 24h après notre échange, sans surprise.",
  },
  {
    question: "Le devis est-il vraiment gratuit ?",
    answer:
      "Oui. Diagnostic et devis sont offerts, sans engagement. Pour les projets web et design, une maquette gratuite vous est également proposée avant toute validation.",
  },
  {
    question: "Intervenez-vous partout en Île-de-France ?",
    answer:
      "Oui, en déplacement ou à distance selon la prestation. Le dépannage informatique se fait généralement sur place, tandis que le web et le design peuvent être gérés entièrement à distance.",
  },
  {
    question: "Quels sont les délais de réalisation ?",
    answer:
      "Une réponse à votre demande arrive sous 24h. La réalisation dépend ensuite du projet : comptez 1 à 3 semaines pour un site vitrine, souvent moins pour du design graphique.",
  },
  {
    question: "Puis-je payer en plusieurs fois ?",
    answer:
      "Oui, le paiement en plusieurs fois est possible sur la plupart des prestations. Ce point est simplement à préciser lors de l'échange initial.",
  },
  {
    question: "Que se passe-t-il après la livraison ?",
    answer:
      "Vous êtes formé rapidement à vos outils, et je reste disponible en cas de question ou de besoin de maintenance. La relation ne s'arrête pas à la livraison du projet.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-accent"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed pb-5 sm:pb-6 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 sm:py-32 relative">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Questions fréquentes
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
