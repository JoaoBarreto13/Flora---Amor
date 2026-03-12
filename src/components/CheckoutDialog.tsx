import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const orderItems = items
      .map((i) => `${i.quantity}x ${i.name} - R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`)
      .join("\n");

    const message = encodeURIComponent(
      `🌸 *Novo Pedido - Flora & Amor*\n\n` +
      `*Cliente:* ${form.name}\n*Telefone:* ${form.phone}\n*Endereço:* ${form.address}\n` +
      `${form.notes ? `*Obs:* ${form.notes}\n` : ""}\n` +
      `*Itens:*\n${orderItems}\n\n` +
      `*Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}*`
    );

    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
    clearCart();
    onOpenChange(false);
    setForm({ name: "", phone: "", address: "", notes: "" });
    toast.success("Pedido enviado via WhatsApp!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Preencha seus dados para enviar o pedido via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Seu nome completo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço de Entrega *</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Rua, número, bairro"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Mensagem no cartão, horário preferido..."
              rows={3}
            />
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="font-semibold text-foreground">
              Total: <span className="text-primary">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
            </span>
            <Button type="submit">Enviar Pedido</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
