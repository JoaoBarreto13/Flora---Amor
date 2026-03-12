import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const Footer = () => {
  return (
    <footer id="contato" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <AnimatedSection animation="fade-in-up" delay={0}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <h3 className="text-xl font-serif font-bold">Flora & Amor</h3>
            </div>
            <p className="text-background/70 mb-4">
              Transformando momentos em memórias através da beleza das flores.
            </p>
            <p className="text-background/50 text-xs uppercase tracking-widest mb-2">Siga-nos</p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/floraeamor"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="h-11 w-11 rounded-full border border-background/20 flex items-center justify-center transition-all duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/floraeamor"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="h-11 w-11 rounded-full border border-background/20 flex items-center justify-center transition-all duration-300 hover:border-transparent hover:bg-blue-600 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection animation="fade-in-up" delay={150}>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Rua das Flores, 123 - Centro</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contato@floraeamor.com.br</span>
              </li>
            </ul>
          </AnimatedSection>

          {/* Hours */}
          <AnimatedSection animation="fade-in-up" delay={300}>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-background/70">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Seg - Sex: 8h às 20h</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Sábado: 8h às 18h</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Domingo: 9h às 14h</span>
              </li>
            </ul>
          </AnimatedSection>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/60 text-sm">
          <p className="text-center">© 2026 Flora & Amor. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>);

};

export default Footer;