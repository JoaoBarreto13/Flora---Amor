import { Star } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Cliente desde 2022",
    content: "As flores chegaram lindas e frescas! Minha mãe amou o presente. Atendimento impecável!",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Cliente desde 2023",
    content: "Surpreendi minha esposa com um arranjo maravilhoso. Entrega super rápida e flores de qualidade.",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Cliente desde 2021",
    content: "Já comprei várias vezes e sempre superam minhas expectativas. Recomendo a todos!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-medium mb-2 block">⭐ Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            O que Nossos Clientes Dizem
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 150} className="h-full" animation="fade-in-up">
              <div className="h-full flex flex-col p-6 rounded-lg bg-background border border-border hover:shadow-md transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic flex-1">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
