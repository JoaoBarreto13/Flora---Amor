import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const CTA = () => {
  const phoneNumber = "5511999999999";
  const message = encodeURIComponent("Olá! Gostaria de fazer um pedido de flores.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection animation="scale-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Pronto para Encantar Alguém?
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Faça seu pedido agora e receba suas flores com toda a delicadeza 
            e carinho que você e sua pessoa especial merecem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link to="/catalogo">Ver Catálogo</Link>
            </Button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 w-full border-primary-foreground/50 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Fale Conosco
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;
