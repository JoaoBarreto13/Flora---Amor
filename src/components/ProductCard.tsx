import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

const ProductCard = ({ name, price, originalPrice, image, category }: ProductCardProps) => {
const { addItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAdd = () => {
    addItem({ name, price, image, category });
    toast.success(`${name} adicionado ao carrinho!`);
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden aspect-square">
        {!imageLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button className="absolute top-3 right-3 h-8 w-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card">
          <Heart className="h-4 w-4 text-foreground" />
        </button>
      </div>
      <CardContent className="pt-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{category}</span>
        <h3 className="font-semibold text-foreground mt-1 mb-2">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full gap-2" onClick={handleAdd}>
          <ShoppingCart className="h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
