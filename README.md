# 🌸 Flora & Amor

Landing page moderna para uma floricultura artesanal, com **catálogo**, **carrinho** e **checkout via WhatsApp**.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-teal) ![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E)

---

## 🛠 Stack

| Tecnologia | Uso |
|---|---|
| **React 18 + TypeScript** | UI |
| **Vite** | Dev server e build |
| **Tailwind CSS + shadcn/ui (Radix)** | Estilos e componentes |
| **React Router** | Rotas SPA |
| **Supabase** | Backend (Auth/DB/Storage, conforme uso no app) |
| **TanStack Query** | Dados assíncronos e cache |
| **Sonner** | Toasts |
| **Vitest** | Testes |

---

## ✨ Funcionalidades

- **Animações & UI**: entrada por scroll (`useScrollAnimation`), parallax no Hero, contadores animados, skeleton em imagens e hover com elevação.
- **Carrinho**: estado via `CartContext`, persistência em `localStorage`, drawer lateral e checkout gerando mensagem pronta para WhatsApp.
- **Catálogo**: filtros combinados (categoria/ocasião/preço), contagem de resultados e reset de filtros quando necessário.

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** (LTS recomendado)
- **npm** (ou seu gerenciador preferido, ajustando os comandos)

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz (ou copie de `.env.example`) com:

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública (anon) |
| `VITE_SUPABASE_PROJECT_ID` | ID/Ref do projeto |

### Rodar em desenvolvimento

O dev server está configurado para a porta **8080**.

```bash
npm run dev
```

Acesse `http://localhost:8080`.

---

## 📜 Scripts

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run preview    # pré-visualização do build
npm run lint       # ESLint
npm run test       # testes (Vitest)
npm run test:watch # testes em watch mode
```

---

## 🗂 Estrutura (resumo)

```
src/
├── assets/          # Imagens (hero, produtos)
├── components/      # Componentes reutilizáveis
│   └── ui/          # shadcn/ui
├── contexts/        # CartContext
├── hooks/           # hooks (scroll/count/mobile)
├── lib/             # utilitários
├── pages/           # Index, Catalog, NotFound
└── main.tsx         # entry
```

---

## 🔐 Segurança

- **Nunca commite `.env`**. Este projeto já inclui regras no `.gitignore` para ignorar `.env` e `.env.*`.
- Se você já tiver versionado um `.env` no passado, remova do índice do Git (`git rm --cached .env`) e gere novas chaves, se necessário.

---

## 📄 Licença

Consulte o arquivo de licença do repositório (se aplicável).
