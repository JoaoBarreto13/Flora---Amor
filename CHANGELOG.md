# 📋 Changelog — Flora & Amor

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

---

## [2.0.0] — 2026-03-06

### ✨ Novas Funcionalidades

#### Sistema de Administração
- **Painel Admin** (`src/pages/AdminDashboard.tsx`) — Interface completa de gerenciamento de produtos com CRUD
- **Login Admin** (`src/pages/AdminLogin.tsx`) — Autenticação com email/senha e verificação de role
- **Hook useAdminAuth** (`src/hooks/useAdminAuth.tsx`) — Proteção de rotas com verificação server-side via `has_role()`
- **Rotas** `/admin/login` e `/admin` adicionadas ao React Router

#### Banco de Dados (Supabase)
- **Tabela `products`** — Nome, preço, preço original, descrição, categoria, ocasião, imagem, estoque, ativo
- **Tabela `user_roles`** — Controle de acesso com enum `app_role` (admin)
- **Tabela `product_audit_log`** — Histórico de todas alterações (create/update/delete) com JSONB de mudanças
- **Função `has_role()`** — Security definer para checagem de permissões sem recursão RLS
- **Trigger `update_updated_at`** — Atualização automática do campo `updated_at`
- **Storage bucket `product-images`** — Upload de imagens de produtos com RLS

#### Funcionalidades do Painel
- **CRUD de produtos** — Criar, editar e excluir produtos com validação completa
- **Upload de imagens** — Upload direto para Cloud Storage com preview
- **Trilha de auditoria** — Histórico detalhado de quem alterou o quê e quando
- **Toggle ativo/inativo** — Controle de visibilidade dos produtos
- **Validação de dados** — Preço > 0, estoque >= 0, campos obrigatórios

### 🔒 Segurança
- RLS em todas as tabelas (products, user_roles, product_audit_log)
- Roles verificados server-side via `has_role()` (security definer)
- Storage protegido com políticas RLS por role

---

## [1.1.1] — 2026-03-06

### 🐛 Correções

- **Products.tsx** — Link "Ver todos os produtos" alterado de `<a href>` para `<Link>` do React Router, evitando reload completo da página
- **About.tsx** — Link do GitHub corrigido de `http://` para `https://`

---

## [1.1.0] — 2026-03-05

### ✨ Novas Funcionalidades

#### Página "Sobre Nós" (`src/pages/About.tsx`)
- **História da floricultura** — Seção narrativa sobre a origem e missão da Flora & Amor
- **Valores da marca** — Grid com 4 cards (Amor, Sustentabilidade, Excelência, Comunidade)
- **Equipe** — Cards com membros da equipe e seus papéis
- **Créditos do desenvolvedor** — Seção com links para LinkedIn e GitHub de João Barreto
- **Rota `/sobre`** adicionada ao React Router (`src/App.tsx`)

#### Navegação
- **Link "Sobre"** adicionado ao Header desktop e mobile (`src/components/Header.tsx`)

### 📝 Documentação

- **JSDoc** adicionado aos componentes principais:
  - `Header` — Descrição da navegação responsiva e scroll suave
  - `Hero` — Descrição do parallax e estatísticas animadas
  - `CountStat` — Documentação dos parâmetros `end`, `suffix`, `label`
  - `Products` — Descrição do grid de produtos com animação
  - `CartDrawer` — Descrição do drawer lateral e integração com checkout
- **CHANGELOG.md** criado e atualizado

### 🧹 Limpeza

- **Removido** `src/components/NavLink.tsx` — componente nunca importado
- **Removido** `src/App.css` — stylesheet padrão do Vite não utilizada

---

## [1.0.0] — 2026-03-05

### ✨ Funcionalidades

#### Landing Page
- **Hero com parallax** — Imagem de fundo com efeito parallax baseado no scroll
- **Estatísticas animadas** — Contagem de 0 até o valor final com easing cubic (`useCountAnimation`)
- **Scroll animations** — Componentes animam com `fade-in-up` e `scale-in` ao entrar na viewport via `IntersectionObserver` (`useScrollAnimation`)
- **Scroll suave** — Links do menu navegam suavemente até as seções via `scrollIntoView`
- **Seção de produtos** — Grid responsivo com cards de produtos em destaque
- **Seção de serviços** — Cards com ícones descrevendo diferenciais da loja
- **Depoimentos** — Grid de avaliações de clientes com estrelas
- **CTA** — Seção de chamada para ação com botão de contato
- **Botão flutuante WhatsApp** — Ícone fixo com tooltip e link direto para WhatsApp

#### Carrinho de Compras
- **Context API** — Estado global via `CartContext` (adicionar, remover, atualizar quantidade)
- **Persistência** — Itens salvos no `localStorage` e restaurados ao recarregar
- **Drawer lateral** — Painel deslizante (`Sheet`) com lista de itens, controles de quantidade e total
- **Checkout via WhatsApp** — Formulário com nome, telefone, endereço e observações → mensagem formatada enviada ao WhatsApp

#### Catálogo
- **Filtros combinados** — Categoria, ocasião e faixa de preço (filtrados via `useMemo`)
- **Contagem de resultados** — Exibe quantidade de produtos encontrados
- **Limpar filtros** — Botão para resetar todos os filtros quando nenhum resultado é encontrado

#### Componentes de UI
- **ProductCard** — Card com skeleton loading, badge de desconto, botão de favoritar e hover com elevação
- **Header** — Navegação responsiva com menu mobile (hambúrguer), links com scroll suave e botão do carrinho
- **Footer** — Informações de contato, redes sociais e horário de funcionamento

### 🛠 Infraestrutura
- Projeto React 18 + TypeScript + Vite
- Tailwind CSS com design system customizado (cores, fontes, animações)
- shadcn/ui (Radix UI) para componentes acessíveis
- React Router para navegação SPA
- Tanstack Query disponível para data fetching
- Sonner para notificações toast

---

## [0.1.0] — Versão Inicial

- Setup inicial do projeto com Vite + React + TypeScript
- Configuração do Tailwind CSS e shadcn/ui
- Estrutura base de pastas e rotas
