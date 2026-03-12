import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "5511999999999";
  const message = encodeURIComponent("Olá! Gostaria de fazer um pedido de flores.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-card rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-card text-foreground text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
