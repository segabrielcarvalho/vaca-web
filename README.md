# Vaca-Web

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-06B6D4?style=flat-square&logo=tailwindcss)

## 📖 Sobre o Projeto

Vaca-Web é uma aplicação web moderna desenvolvida com Next.js 15 e React 19, que serve como painel administrativo para gerenciamento das provas e gabaritos. O projeto oferece uma interface intuitiva e responsiva para criação, edição e análise de provas em tempo real.

### ✨ Principais Funcionalidades

- 📝 **Gerenciamento das Provas e Gabaritos**: Interface completa para criação e administração de provas
- 📊 **Dashboard em Tempo Real**: Monitoramento de métricas e performance das avaliações
- 👥 **Gestão de Usuários**: Sistema completo de autenticação e autorização
- 🎨 **Interface Moderna**: Design responsivo com Tailwind CSS e Headless UI
- 🔄 **GraphQL Integration**: API robusta com Apollo Client
- 🌐 **PWA Ready**: Otimizado para experiência mobile
- 🔐 **Autenticação JWT**: Sistema seguro de autenticação
- 📝 **Markdown Support**: Editor e visualizador de markdown integrado

## 🛠️ Tecnologias Utilizadas

### Core

- **Next.js 15.3.3** - Framework React full-stack
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário

### Estado e Dados

- **Apollo Client** - Cliente GraphQL com cache inteligente
- **GraphQL** - Linguagem de consulta para APIs
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de esquemas TypeScript

### UI/UX

- **Headless UI** - Componentes acessíveis sem estilo
- **Heroicons** - Biblioteca de ícones
- **Framer Motion** - Animações fluidas
- **React Toastify** - Notificações elegantes
- **Lucide React** - Ícones modernos

### Ferramentas de Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **GraphQL Code Generator** - Geração automática de tipos
- **pnpm** - Gerenciador de pacotes rápido

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js 22+
- pnpm (recomendado) ou npm
- Arquivo `.env.local` configurado

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/segabrielcarvalho/vaca-web.git
cd vaca-web
```

2. **Instale as dependências**

```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações
```

4. **Execute o servidor de desenvolvimento**

```bash
pnpm dev
# ou
npm run dev
```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                 # Inicia o servidor de desenvolvimento
pnpm build              # Cria build de produção
pnpm start              # Inicia servidor de produção
pnpm lint               # Executa linting

# GraphQL
pnpm generate           # Gera tipos TypeScript do GraphQL
pnpm generate:watch     # Gera tipos em modo watch

# Utilitários
pnpm loadenv           # Carrega variáveis de ambiente
```

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js 15
│   ├── (app)/          # Rotas da aplicação principal
│   ├── (auth)/         # Rotas de autenticação
│   ├── layout.tsx      # Layout raiz
│   └── providers.tsx   # Provedores de contexto
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes de UI base
│   ├── icons/         # Componentes de ícones
│   └── layout/        # Componentes de layout
├── contexts/          # Contextos React
├── graphql/           # Schemas e queries GraphQL
├── hooks/             # Hooks personalizados
├── lib/               # Utilitários e helpers
├── routes/            # Definições de rotas
├── services/          # Configurações de serviços
└── styles/            # Estilos globais
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# GraphQL API
NEXT_PUBLIC_GRAPHQL_URL=https://api.exemplo.com/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=wss://api.exemplo.com/graphql

# Autenticação
NEXT_PUBLIC_JWT_SECRET=seu-jwt-secret

# Outros
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### GraphQL Code Generation

O projeto usa GraphQL Code Generator para tipagem automática:

```bash
# Gerar tipos uma vez
pnpm generate

# Modo watch para desenvolvimento
pnpm generate:watch
```

## 🎨 Desenvolvimento

### Padrões de Código

- **TypeScript** para tipagem estática
- **ESLint** para qualidade de código
- **Prettier** para formatação consistente
- **Conventional Commits** para mensagens de commit

## 🚢 Deploy

### Build de Produção

```bash
pnpm build
pnpm start
```

### Docker

```bash
# Build da imagem
docker build -t vaca-web .

# Executar container
docker run -p 3000:3000 vaca-web
```

### Vercel (Recomendado)

O projeto está otimizado para deploy na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
