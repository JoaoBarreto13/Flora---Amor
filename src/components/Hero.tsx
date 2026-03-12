/**
 * @component Hero
 * @description Seção hero da landing page com imagem de fundo em parallax,
 * textos animados (fade-in-up), botões CTA e estatísticas com contagem animada.
 * O efeito parallax desloca a imagem de fundo a 15% da velocidade do scroll.
 */
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-flowers.jpg";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * @component CountStat
 * @description Exibe uma estatística com contagem animada de 0 até o valor final.
 * @param {number} end - Valor final da contagem
 * @param {string} suffix - Sufixo exibido após o número (ex: "+", "★")
 * @param {string} label - Rótulo descritivo abaixo do número
 */
const CountStat = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCountAnimation({ end, duration: 2000 });
  return (
    <div ref={ref}>
      <p className="text-3xl font-bold text-primary">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Arranjo floral elegante"
          className="w-full h-[120%] object-cover"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <AnimatedSection animation="fade-in" delay={0}>
            <span className="inline-block text-primary font-medium mb-4">
              🌹 Floricultura Premium
            </span>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Flores que <br />
              <span className="text-primary">Encantam</span> e <br />
              Emocionam
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Transforme momentos especiais com arranjos florais únicos, 
              criados com amor e dedicação para surpreender quem você ama.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <a href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os arranjos." target="_blank" rel="noopener noreferrer">Fale Conosco</a>
              </Button>
            </div>
          </AnimatedSection>

          {/* Stats with counting animation */}
          <AnimatedSection animation="fade-in-up" delay={400}>
            <div className="flex gap-8 mt-12 pt-8 border-t border-border/50">
              <CountStat end={500} suffix="+" label="Clientes Felizes" />
              <CountStat end={1000} suffix="+" label="Arranjos Entregues" />
              <CountStat end={5} suffix="★" label="Avaliação Média" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
