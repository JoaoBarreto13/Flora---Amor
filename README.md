# Flora & Amor

Flora & Amor é uma landing page moderna para uma floricultura artesanal fictícia.  
O projeto apresenta um catálogo de produtos, carrinho de compras e checkout simplificado via WhatsApp, com foco em experiência do usuário e interface responsiva.

---

## Tecnologias

| Tecnologia | Descrição |
|---|---|
| React 18 + TypeScript | Desenvolvimento da interface |
| Vite | Ambiente de desenvolvimento e build |
| Tailwind CSS | Estilização da aplicação |
| shadcn/ui (Radix UI) | Componentes de interface |
| React Router | Gerenciamento de rotas |
| Supabase | Backend (autenticação, banco de dados e storage) |
| TanStack Query | Gerenciamento de dados assíncronos e cache |
| Sonner | Sistema de notificações |
| Vitest | Testes |

---

## Funcionalidades

### Catálogo
- Listagem de produtos
- Filtros por categoria, ocasião e preço
- Contagem de resultados
- Reset automático de filtros

### Carrinho
- Gerenciamento de estado com React Context
- Persistência de dados com localStorage
- Interface de carrinho em drawer lateral
- Checkout gerando mensagem automática para WhatsApp

### Interface
- Animações de entrada por scroll
- Parallax na seção hero
- Contadores animados
- Skeleton loading em imagens
- Interações de hover

---

## Instalação

### Pré-requisitos

- Node.js  
- npm

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/flora-amor.git
cd flora-amor
```

### Instalar dependências

```bash
npm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
```

---

## Executando o Projeto

O servidor de desenvolvimento está configurado para a porta **8080**.

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:8080
```

---

## Estrutura do Projeto

```
src
├── assets
├── components
│   └── ui
├── contexts
├── hooks
├── lib
├── pages
└── main.tsx
```

---

## Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.
