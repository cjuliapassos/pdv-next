# PDV Next

Sistema de Ponto de Venda (PDV) moderno desenvolvido com Next.js, React e TypeScript.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com Server Side Rendering
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS 4** - Framework CSS utility-first
- **Zustand** - Gerenciamento de estado leve e moderno
- **ESLint** - Linter para qualidade de código

## 📋 Funcionalidades

- **Autenticação** - Sistema de login seguro
- **PDV (Ponto de Venda)** - Interface de vendas completa
- **Produtos** - Gestão de produtos
- **Vendas** - Histórico e gerenciamento de vendas
- **Carrinho** - Gerenciamento de carrinho de compras com Zustand

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Rotas Next.js (App Router)
│   ├── (auth)/            # Rotas de autenticação
│   │   └── login/         # Página de login
│   ├── (pdv)/             # Rotas do PDV
│   │   ├── pos/           # Ponto de venda
│   │   ├── products/      # Listagem de produtos
│   │   └── sales/         # Histórico de vendas
│   └── api/               # API Routes
│       ├── products/      # Endpoints de produtos
│       └── sales/         # Endpoints de vendas
├── components/            # Componentes reutilizáveis
├── features/              # Features organizadas por domínio
│   ├── auth/              # Funcionalidades de autenticação
│   ├── products/          # Funcionalidades de produtos
│   └── sales/             # Funcionalidades de vendas
├── lib/                   # Utilitários e helpers
├── stores/                # Estado global (Zustand)
│   ├── auth.store.ts      # Estado de autenticação
│   └── cart.store.ts      # Estado do carrinho
└── types/                 # Tipos TypeScript globais
```

## 🔧 Pré-requisitos

- Node.js 20 ou superior
- npm, yarn, pnpm ou bun

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd pdv-next
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### 4. Build para produção

```bash
npm run build
npm run start
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 📱 Páginas Principais

- `/login` - Página de autenticação
- `/pos` - Interface do ponto de venda
- `/products` - Listagem e gerenciamento de produtos
- `/sales` - Histórico de vendas

## 🔌 API Routes

- `POST /api/products` - CRUD de produtos
- `POST /api/sales` - Gerenciamento de vendas

## 📝 Licença

Este projeto é privado.