import { Truck, Gift, Heart, Calendar } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Truck,
    title: "Entrega Expressa",
    description: "Entregamos suas flores em até 3 horas na região metropolitana.",
  },
  {
    icon: Gift,
    title: "Embalagem Premium",
    description: "Cada arranjo é cuidadosamente embalado para chegar perfeito.",
  },
  {
    icon: Heart,
    title: "Flores Frescas",
    description: "Trabalhamos apenas com flores frescas e de alta qualidade.",
  },
  {
    icon: Calendar,
    title: "Assinatura Mensal",
    description: "Receba flores frescas todo mês com desconto especial.",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12" animation="fade-in">
          <span className="text-primary font-medium mb-2 block">💐 Nossos Serviços</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Por que Escolher a Flora & Amor?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma experiência completa para que você envie amor 
            através das flores mais bonitas.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 100} animation="fade-in-up">
              <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
