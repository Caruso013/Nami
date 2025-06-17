# 💰 Nami — Gerenciador Financeiro Pessoal

Nami é uma aplicação moderna de gerenciamento financeiro pessoal, pensada para oferecer **controle real sobre receitas, despesas, orçamentos e metas** — tudo isso com uma interface fluida, responsiva e amigável.

> Desenvolvido com foco na praticidade de autônomos, freelancers e qualquer pessoa que queira entender para onde seu dinheiro está indo — sem complicações.

---

## 🚀 Funcionalidades Principais

- ✅ **Autenticação Segura** com Supabase
- 📥 **Registro de transações** (renda ou despesa)
- 🗂️ **Categorias personalizadas**
- 📊 **Dashboard com cards dinâmicos** (saldo atual, total de receitas, total de despesas)
- 🔍 **Filtros por data, tipo e categoria**
- 📈 **Gráficos interativos** com Recharts ou Chart.js
- 🚨 **Alertas de orçamento excedido**
- 📤 **Exportação de dados** em CSV e PDF (via jsPDF)
- ✨ **UI fluida** com TailwindCSS + Framer Motion

---

## 🧠 Por que "Nami"?

Embora o nome seja uma homenagem sutil à personagem de *One Piece*, navegadora e especialista em finanças da tripulação, o objetivo aqui vai além de um tema bonito: **queremos oferecer uma bússola para seu dinheiro.**

---

## 🧱 Stack Utilizada

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase (Auth + DB)](https://supabase.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js ou Recharts](https://recharts.org/)
- [jsPDF](https://github.com/parallax/jsPDF)

---

## 🔐 Segurança e Privacidade

Cada usuário tem um dashboard **100% isolado**, com **Row-Level Security (RLS)** ativada no Supabase. Nenhum dado é exposto fora do contexto do dono da conta. Isso é mais que uma prática: é um compromisso com a **privacidade**.

---

## ⚙️ Como Rodar Localmente

```bash
git clone https://github.com/seu-usuario/nami-finance.git
cd nami-finance
npm install
npm run dev
