import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CATEGORIES, OCCASIONS } from "@/lib/productOptions";

import productRoses from "@/assets/product-roses.jpg";
import productOrchid from "@/assets/product-orchid.jpg";
import productWildflowers from "@/assets/product-wildflowers.jpg";
import productLilies from "@/assets/product-lilies.jpg";

// Fallback static products
const staticProducts = [
  { name: "Buquê de Rosas Vermelhas", price: 149.90, originalPrice: 189.90, image: productRoses, category: "Rosas", occasion: "Romântico" },
  { name: "Orquídea Phalaenopsis", price: 189.90, image: productOrchid, category: "Orquídeas", occasion: "Decoração" },
  { name: "Buquê Campo Alegre", price: 129.90, originalPrice: 159.90, image: productWildflowers, category: "Buquês", occasion: "Aniversário" },
  { name: "Arranjo de Lírios Brancos", price: 169.90, image: productLilies, category: "Lírios", occasion: "Condolências" },
  { name: "Rosas Cor de Rosa", price: 139.90, image: productRoses, category: "Rosas", occasion: "Aniversário" },
  { name: "Orquídea Branca Premium", price: 229.90, image: productOrchid, category: "Orquídeas", occasion: "Corporativo" },
  { name: "Buquê Misto Primavera", price: 119.90, originalPrice: 149.90, image: productWildflowers, category: "Buquês", occasion: "Romântico" },
  { name: "Lírios Coloridos", price: 159.90, image: productLilies, category: "Lírios", occasion: "Decoração" },
];

const categories = ["Todas", ...CATEGORIES];
const occasions = ["Todas", ...OCCASIONS];
const priceRanges = [
  { label: "Todos os preços", value: "all" },
  { label: "Até R$ 130", value: "0-130" },
  { label: "R$ 130 - R$ 170", value: "130-170" },
  { label: "Acima de R$ 170", value: "170-999" },
];

const Catalog = () => {
  const [category, setCategory] = useState("Todas");
  const [occasion, setOccasion] = useState("Todas");
  const [priceRange, setPriceRange] = useState("all");

  const { data: dbProducts } = useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const allProducts = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        name: p.name,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : undefined,
        image: p.image_url || productRoses,
        category: p.category,
        occasion: p.occasion || "",
      }));
    }
    return staticProducts;
  }, [dbProducts]);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      if (category !== "Todas" && p.category !== category) return false;
      if (occasion !== "Todas" && p.occasion !== occasion) return false;
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (p.price < min || p.price > max) return false;
      }
      return true;
    });
  }, [allProducts, category, occasion, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Catálogo Completo</h1>
              <p className="text-muted-foreground">Encontre o arranjo perfeito para cada momento</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-lg bg-card border border-border">
            <div className="flex-1 min-w-[160px]">
              <label className="text-sm font-medium text-foreground mb-1 block">Categoria</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="text-sm font-medium text-foreground mb-1 block">Ocasião</label>
              <Select value={occasion} onValueChange={setOccasion}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {occasions.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="text-sm font-medium text-foreground mb-1 block">Faixa de Preço</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {priceRanges.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} produto(s) encontrado(s)</p>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
              <Button variant="link" onClick={() => { setCategory("Todas"); setOccasion("Todas"); setPriceRange("all"); }}>
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Catalog;
