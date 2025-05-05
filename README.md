#  📌 Big Chat Brasil - BCB Frontend

Projeto de frontend para o desafio BCB, desenvolvido em NextJS. O projeto é um sistema de envio de mensagens via chat para clientes brasileiros.

---

## 🔥 Funcionalidades

- Login de clientes
- Cadastro de clientes
- Cadastro de conversas
- Envio de mensagens
- Interface de usuário responsiva

## 🛠 Tecnologias Utilizadas

- **Frontend**: Next.js 14
- **Estilização**: TailwindCSS
- **Componentes**: Headless UI e Framer Motion

**Pré-requisitos:**

- Node.js (v14 ou superior)

---

##  ⚙️ Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto.

### 1. Clonar o repositório

```bash
git clone https://github.com/guilhermevenci/big-chat-brasil-frontend.git
cd big-chat-brasil-frontend
```

### 2. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```bash
NEXT_PUBLIC_JWT_SECRET="chave_super_secreta_min_32_characters_123!"
NEXT_PUBLIC_API_URL="http://localhost:3000" (Rota da API)
NEXT_PUBLIC_SITE_URL="http://localhost:4000"
```

### 3. Instalar dependências

```
npm install
```

### 4. Executar o projeto

```
npm run dev
```

---

## 📂 Estrutura do Projeto

```
big-chat-brasil-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   │   │   ├── actions
│   │   │   │   ├── route.tsx
│   │   │   ├── client-actions.ts
│   │   │   ├── layout.tsx
│   │   ├── (workspace)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   ├── messages/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx
│   │   │   ├── auth-guard.tsx
│   │   │   ├── layout.tsx
│   ├── components/
│   │   ├── custom/
│   │   ├── forms/
│   │   │   ├── client-form.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── send-message-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   ├── inputs/
│   │   ├── ui/
│   ├── context/
│   │   ├── clients-context.tsx
│   │   ├── conversations-context.tsx
│   │   ├── user-context.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   ├── cn.ts
│   ├── middleware.ts
├── .env
├── next.config.js
├── package.json
├── README.md
```

---

## 📋 Boas Práticas

- Autenticação em SSR
- Componentes reutilizáveis e modulares
- Estilização consistente com TailwindCSS

---

# 📣 Autor

**Guilherme Sanches de Arruda Venci**  
LinkedIn: [linkedin.com/in/guilherme-sanches-de-arruda-venci](https://br.linkedin.com/in/guilherme-sanches-de-arruda-venci)
