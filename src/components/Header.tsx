/**
 * @component Header
 * @description Barra de navegação fixa com menu responsivo (hambúrguer no mobile),
 * links de scroll suave para seções da landing page, navegação entre páginas
 * via React Router e integração com o carrinho de compras ({@link CartDrawer}).
 */
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <h1 className="text-xl font-serif font-bold text-foreground">
            Flora & Amor
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("inicio")} className="text-foreground hover:text-primary transition-colors">Início</button>
          <button onClick={() => scrollToSection("produtos")} className="text-foreground hover:text-primary transition-colors">Produtos</button>
          <Link to="/catalogo" className="text-foreground hover:text-primary transition-colors">Catálogo</Link>
          <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors">Serviços</button>
          <Link to="/sobre" className="text-foreground hover:text-primary transition-colors">Sobre</Link>
          <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors">Contato</button>
        </nav>

        <div className="flex items-center gap-4">
          <CartDrawer />
          <Button className="hidden md:flex" asChild>
            <Link to="/catalogo">Comprar Agora</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-card border-t border-border py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("inicio")} className="text-foreground hover:text-primary transition-colors py-2 text-left">Início</button>
            <button onClick={() => scrollToSection("produtos")} className="text-foreground hover:text-primary transition-colors py-2 text-left">Produtos</button>
            <Link to="/catalogo" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Catálogo</Link>
            <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors py-2 text-left">Serviços</button>
            <Link to="/sobre" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
            <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors py-2 text-left">Contato</button>
            <Button className="w-full mt-2" asChild>
              <Link to="/catalogo">Comprar Agora</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
