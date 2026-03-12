import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, OCCASIONS } from "@/lib/productOptions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, History, Package, Upload } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

interface ProductForm {
  name: string;
  price: string;
  original_price: string;
  description: string;
  category: string;
  occasion: string;
  stock: string;
  active: boolean;
  image_url: string;
}

const emptyForm: ProductForm = {
  name: "",
  price: "",
  original_price: "",
  description: "",
  category: "",
  occasion: "",
  stock: "0",
  active: true,
  image_url: "",
};

const PRODUCT_IMAGES_PUBLIC_PREFIX = "/storage/v1/object/public/product-images/";

function getStoragePathFromPublicUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const idx = u.pathname.indexOf(PRODUCT_IMAGES_PUBLIC_PREFIX);
    if (idx === -1) return null;
    const path = u.pathname.slice(idx + PRODUCT_IMAGES_PUBLIC_PREFIX.length);
    return path ? decodeURIComponent(path) : null;
  } catch {
    return null;
  }
}

const AdminDashboard = () => {
  const { user, loading: authLoading, signOut } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [auditLogs, setAuditLogs] = useState<Tables<"product_audit_log">[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previousImageUrl, setPreviousImageUrl] = useState<string>("");

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  }, []);

  const fetchAuditLogs = useCallback(async () => {
    const { data } = await supabase
      .from("product_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setAuditLogs(data);
  }, []);

  useEffect(() => {
    if (user) fetchProducts();
  }, [user, fetchProducts]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPreviousImageUrl("");
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setPreviousImageUrl(p.image_url || "");
    setForm({
      name: p.name,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : "",
      description: p.description || "",
      category: p.category,
      occasion: p.occasion || "",
      stock: String(p.stock),
      active: p.active,
      image_url: p.image_url || "",
    });
    setDialogOpen(true);
  };

  const deleteFromStorageIfPossible = useCallback(async (publicUrl: string) => {
    const path = getStoragePathFromPublicUrl(publicUrl);
    if (!path) return;
    await supabase.storage.from("product-images").remove([path]);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem deve ter no máximo 5MB.");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file);

    if (error) {
      toast.error("Erro ao enviar imagem.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);

    setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    setUploading(false);
    toast.success("Imagem enviada!");
  };

  const handleRemoveImage = async () => {
    const current = form.image_url.trim();
    if (!current) return;
    setForm((prev) => ({ ...prev, image_url: "" }));

    // Se a imagem veio do bucket, removemos o arquivo também para sair do "banco"/storage
    try {
      await deleteFromStorageIfPossible(current);
      toast.success("Imagem removida.");
    } catch {
      toast.success("Imagem removida do produto.");
    }
  };

  const validate = (): boolean => {
    if (!form.name.trim()) { toast.error("Nome é obrigatório."); return false; }
    if (form.name.length > 200) { toast.error("Nome deve ter no máximo 200 caracteres."); return false; }
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) { toast.error("Preço deve ser maior que zero."); return false; }
    if (form.original_price) {
      const op = parseFloat(form.original_price);
      if (isNaN(op) || op <= 0) { toast.error("Preço original inválido."); return false; }
    }
    const stock = parseInt(form.stock);
    if (isNaN(stock) || stock < 0) { toast.error("Estoque deve ser >= 0."); return false; }
    if (!form.category.trim()) { toast.error("Categoria é obrigatória."); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validate() || !user) return;
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      description: form.description.trim(),
      category: form.category.trim(),
      occasion: form.occasion.trim(),
      stock: parseInt(form.stock),
      active: form.active,
      image_url: form.image_url,
    };

    if (editingId) {
      const oldProduct = products.find((p) => p.id === editingId);
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Erro ao atualizar produto.");
        setSaving(false);
        return;
      }

      // Se o usuário limpou a imagem anterior, tentamos remover do bucket também
      if (!payload.image_url && previousImageUrl) {
        try {
          await deleteFromStorageIfPossible(previousImageUrl);
        } catch {
          // best-effort
        }
      }

      // Audit log
      const changes: Record<string, { old: unknown; new: unknown }> = {};
      if (oldProduct) {
        (Object.keys(payload) as (keyof typeof payload)[]).forEach((key) => {
          if (String(oldProduct[key]) !== String(payload[key])) {
            changes[key] = { old: oldProduct[key], new: payload[key] };
          }
        });
      }

      await supabase.from("product_audit_log").insert([{
        product_id: editingId,
        user_id: user.id,
        action: "update",
        changes: JSON.parse(JSON.stringify(changes)) as Json,
      }]);

      toast.success("Produto atualizado!");
    } else {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();

      if (error) {
        toast.error("Erro ao criar produto.");
        setSaving(false);
        return;
      }

      await supabase.from("product_audit_log").insert([{
        product_id: newProduct.id,
        user_id: user.id,
        action: "create",
        changes: JSON.parse(JSON.stringify(payload)) as Json,
      }]);

      toast.success("Produto criado!");
    }

    setSaving(false);
    setDialogOpen(false);
    setPreviousImageUrl("");
    fetchProducts();
  };

  const handleDelete = async (p: Product) => {
    if (!user) return;
    if (!confirm(`Excluir "${p.name}"?`)) return;

    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast.error("Erro ao excluir produto.");
      return;
    }

    await supabase.from("product_audit_log").insert([{
      product_id: p.id,
      user_id: user.id,
      action: "delete",
      changes: JSON.parse(JSON.stringify({ name: p.name, price: p.price })) as Json,
    }]);

    toast.success("Produto excluído!");
    fetchProducts();
  };

  const openAudit = () => {
    fetchAuditLogs();
    setAuditOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <h1 className="text-xl font-serif font-bold text-foreground">Painel Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={openAudit}>
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Histórico</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-serif font-bold text-foreground">Produtos</h2>
            <span className="text-sm text-muted-foreground">({products.length})</span>
          </div>
          <Button className="gap-2" onClick={openNew}>
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum produto cadastrado.</p>
              <Button className="mt-4 gap-2" onClick={openNew}>
                <Plus className="h-4 w-4" />
                Criar primeiro produto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Estoque</TableHead>
                    <TableHead className="text-center">Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {p.image_url && (
                            <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded object-cover" />
                          )}
                          <div>
                            <p className="font-medium text-foreground">{p.name}</p>
                            {p.occasion && <p className="text-xs text-muted-foreground">{p.occasion}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.category}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        R$ {Number(p.price).toFixed(2).replace(".", ",")}
                      </TableCell>
                      <TableCell className="text-right text-foreground">{p.stock}</TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${p.active ? "bg-green-500" : "bg-destructive"}`} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </main>

      {/* Product Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Produto" : "Novo Produto"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Atualize os dados do produto." : "Preencha os dados do novo produto."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome do produto" maxLength={200} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço (R$) *</Label>
                <Input type="number" step="0.01" min="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="149.90" />
              </div>
              <div className="space-y-2">
                <Label>Preço Original (R$)</Label>
                <Input type="number" step="0.01" min="0.01" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} placeholder="189.90" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ocasião</Label>
                <Select value={form.occasion} onValueChange={(v) => setForm({ ...form, occasion: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione a ocasião" /></SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Estoque *</Label>
              <Input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição do produto..." rows={3} maxLength={1000} />
            </div>
            <div className="space-y-2">
              <Label>Imagem</Label>
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="w-full h-40 object-cover rounded-md mb-2" />
              )}
              <div className="flex gap-2">
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="URL da imagem ou faça upload" className="flex-1" />
                <Button variant="outline" size="icon" className="shrink-0" disabled={uploading} asChild>
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!form.image_url}
                  onClick={handleRemoveImage}
                >
                  Remover
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
              <Label>Produto ativo</Label>
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Audit Log Dialog */}
      <Dialog open={auditOpen} onOpenChange={setAuditOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Histórico de Alterações</DialogTitle>
            <DialogDescription>Últimas 50 ações no sistema.</DialogDescription>
          </DialogHeader>
          {auditLogs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhum registro encontrado.</p>
          ) : (
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <Card key={log.id} className="border-border">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        log.action === "create" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                        log.action === "update" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                        "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {log.action === "create" ? "Criado" : log.action === "update" ? "Atualizado" : "Excluído"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    {log.changes && typeof log.changes === "object" && (
                      <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-all">
                        {JSON.stringify(log.changes, null, 2)}
                      </pre>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
