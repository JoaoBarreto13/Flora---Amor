# 🌸 Flora & Amor

Landing page moderna para uma floricultura artesanal, com carrinho de compras, catálogo com filtros e checkout via WhatsApp.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-teal)

---

## 🛠 Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 18** | Biblioteca de UI |
| **TypeScript** | Tipagem estática |
| **Vite** | Build tool e dev server |
| **Tailwind CSS** | Estilização utility-first |
| **shadcn/ui** | Componentes acessíveis (Radix UI) |
| **React Router** | Navegação SPA |
| **Recharts** | Gráficos (disponível) |
| **Tanstack Query** | Gerenciamento de dados assíncronos |
| **Sonner** | Notificações toast |

---

## 🧩 Estrutura de Componentes

```
App
├── Index (Landing Page)
│   ├── Header ─── CartDrawer ─── CheckoutDialog
│   ├── Hero
│   ├── Products ─── ProductCard
│   ├── Services
│   ├── Testimonials
│   ├── CTA
│   ├── Footer
│   └── WhatsAppButton
│
├── Catalog
│   ├── Header ─── CartDrawer ─── CheckoutDialog
│   ├── ProductCard (grid com filtros)
│   ├── Footer
│   └── WhatsAppButton
│
└── NotFound
```

---

## ✨ Funcionalidades

### Animações & UI

- **Scroll animations** — Componentes aparecem com `fade-in-up` e `scale-in` ao entrar na viewport, via `IntersectionObserver` (`useScrollAnimation`)
- **Parallax** — Imagem de fundo do Hero move-se com velocidade reduzida ao rolar a página
- **Contagem animada** — Estatísticas no Hero contam de 0 até o valor final com easing cubic (`useCountAnimation`)
- **Skeleton loading** — Cards de produtos exibem placeholder animado enquanto a imagem carrega
- **Hover com elevação** — Cards sobem (`-translate-y-2`) e ganham sombra ao passar o mouse
- **Scroll suave** — Links do menu navegam suavemente até as seções via `scrollIntoView`

### Carrinho de Compras

- **Context API** — Estado global do carrinho via `CartContext` (adicionar, remover, atualizar quantidade)
- **Persistência** — Itens salvos no `localStorage` e restaurados ao recarregar
- **Drawer lateral** — Painel deslizante com lista de itens, controles de quantidade e total
- **Checkout via WhatsApp** — Formulário de dados do cliente → mensagem formatada enviada ao WhatsApp

### Catálogo

- **Filtros combinados** — Categoria, ocasião e faixa de preço (filtrados via `useMemo`)
- **Contagem de resultados** — Exibe quantidade de produtos encontrados
- **Limpar filtros** — Botão para resetar todos os filtros quando nenhum resultado é encontrado

---

## 📁 Estrutura de Pastas

```
src/
├── assets/          # Imagens (hero, produtos)
├── components/      # Componentes reutilizáveis
│   └── ui/          # shadcn/ui (Button, Card, Sheet, Dialog, etc.)
├── contexts/        # CartContext (estado do carrinho)
├── hooks/           # useScrollAnimation, useCountAnimation, useMobile
├── lib/             # Utilitários (cn)
├── pages/           # Index, Catalog, NotFound
└── main.tsx         # Entry point
```

---

## 🚀 Desenvolvimento

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd flora-e-amor

# Instalar dependências
npm install

# Iniciar dev server (http://localhost:5173)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## 📄 Licença

Consulte a licença do repositório.
