/**
 * @component Products
 * @description Seção de produtos em destaque da landing page.
 * Exibe um grid responsivo de {@link ProductCard} com animação scale-in ao scroll.
 * Busca produtos do banco de dados; usa fallback estático se vazio.
 */
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import productRoses from "@/assets/product-roses.jpg";
import productOrchid from "@/assets/product-orchid.jpg";
import productWildflowers from "@/assets/product-wildflowers.jpg";
import productLilies from "@/assets/product-lilies.jpg";

const staticProducts = [
  { name: "Buquê de Rosas Vermelhas", price: 149.90, originalPrice: 189.90, image: productRoses, category: "Rosas" },
  { name: "Orquídea Phalaenopsis", price: 189.90, image: productOrchid, category: "Orquídeas" },
  { name: "Buquê Campo Alegre", price: 129.90, originalPrice: 159.90, image: productWildflowers, category: "Buquês" },
  { name: "Arranjo de Lírios Brancos", price: 169.90, image: productLilies, category: "Lírios" },
];

const Products = () => {
  const { data: dbProducts } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const products = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        name: p.name,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : undefined,
        image: p.image_url || productRoses,
        category: p.category,
      }));
    }
    return staticProducts;
  }, [dbProducts]);

  return (
    <section id="produtos" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-medium mb-2 block">🌷 Nosso Catálogo</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Flores em Destaque
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção especial de arranjos e buquês, 
            perfeitos para cada ocasião e sentimento.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <AnimatedSection key={index} delay={index * 100} animation="scale-in">
              <ProductCard {...product} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/catalogo" className="text-primary font-medium hover:underline">
            Ver todos os produtos →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Products;
