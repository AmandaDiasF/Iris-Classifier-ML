# Iris Classifier ML Dashboard

Dashboard moderno em **React 19**, **Vite 8** e **Tailwind CSS v4** integrado à API de Machine Learning na **Azure** para previsão taxonômica das espécies da flor Iris (*Iris setosa*, *Iris versicolor* e *Iris virginica*).

---

## 🌸 Sumário das Funcionalidades

- **Formulário de Entrada:** 4 campos numéricos (`sepal_length`, `sepal_width`, `petal_length`, `petal_width`) com entrada direta e sliders táteis sincronizados.
- **Integração com API Azure:** Envia requisições POST para `https://mlteste-a5akend9ach6c3h0.westus3-01.azurewebsites.net/api/predict` com medição de latência em tempo real.
- **Destaque Visual da Predição:** Exibição da espécie prevista (`predicao`), código da classe (`codigo`) e dados recebidos (`dados_recebidos`), acompanhados por fotos botânicas e tabela comparativa com as faixas típicas do dataset de Fisher (1936).
- **Tratamento de Erros & Loading:** Indicador de carregamento animado com botão bloqueado durante a inferência e banner de tratamento de erro com opção de retry.
- **Histórico & Exportação:** Histórico persistente no navegador via `localStorage` com opção de reutilizar parâmetros com 1 clique e exportar para CSV.
- **Guia Integrado de Deploy & VS Code:** Modal interativo completo dentro da própria interface com instruções para VS Code, Vercel e Azure.

---

## 🛠️ Extensões Obrigatórias e Recomendadas para o VS Code

Para garantir que o autocomplete do Tailwind funcione, os erros de TypeScript sejam sinalizados imediatamente e o deploy da Azure seja direto:

1. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Autocomplete inteligente das classes Tailwind CSS.
2. **ESLint** (`dbaeumer.vscode-eslint`) - Linter para JavaScript e TypeScript.
3. **Prettier - Code formatter** (`esbenp.prettier-vscode`) - Formatação automática ao salvar os arquivos.
4. **Azure Static Web Apps** (`ms-azuretools.vscode-azurestaticwebapps`) - Extensão oficial da Microsoft para criação e deploy na Azure direto do VS Code.
5. **Azure Resources** (`ms-azuretools.vscode-azureresourcegroups`) - Visualização dos grupos de recursos na Azure.
6. **REST Client** (`humao.rest-client`) - Permite disparar as requisições do arquivo `api-test.http` diretamente no VS Code.

### Instalação em Lote pelo Terminal:
```bash
code --install-extension bradlc.vscode-tailwindcss \
     --install-extension dbaeumer.vscode-eslint \
     --install-extension esbenp.prettier-vscode \
     --install-extension ms-azuretools.vscode-azurestaticwebapps \
     --install-extension ms-azuretools.vscode-azureresourcegroups \
     --install-extension humao.rest-client
```

> **Nota:** Os arquivos `.vscode/extensions.json` e `.vscode/settings.json` já vêm configurados no projeto.

---

## 💻 Configuração do Ambiente de Desenvolvimento

### Pré-Requisitos:
- **Node.js:** Versão 18.x ou 20.x LTS instalada ([nodejs.org](https://nodejs.org/)).
- **Git** instalado no computador.

### Passo a Passo Local:
```bash
# 1. Clone ou transfira os arquivos para uma pasta e abra no VS Code:
code .

# 2. Instale todas as dependências (esbuild ^0.28.0 já fixado para compatibilidade com Vite 8):
npm install

# 3. Inicie o servidor de desenvolvimento:
npm run dev

# Acesse no navegador:
# http://localhost:3000
```

### Build de Produção:
```bash
npm run build
```
O build compila os assets otimizados para a pasta `dist/`.

---

## 🚀 Como Fazer o Deploy na Vercel

A aplicação já conta com o arquivo `vercel.json` configurado para roteamento SPA e redirecionamento de API.

### Opção 1: Pelo Portal da Vercel (Recomendado)
1. Crie um repositório no seu GitHub e suba o projeto:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit iris dashboard"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
3. Clique em **"Add New..." → "Project"**.
4. Selecione o repositório importado.
5. As configurações de Build serão detectadas automaticamente:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Clique em **"Deploy"**. Em cerca de 30 segundos seu link estará no ar com HTTPS gratuito!

---

## ☁️ Como Fazer o Deploy na Azure (com Vídeo de Apoio)

Vídeo de apoio recomendado: [Deploy na Azure Passo a Passo](https://www.youtube.com/watch?v=tsm2DjrBnsw)

O método mais moderno, rápido e econômico (nível gratuito perpétuo) para aplicações React Vite é o **Azure Static Web Apps**. O arquivo `staticwebapp.config.json` já está incluído na raiz.

### Passo a Passo no VS Code:
1. Abra o projeto no VS Code e certifique-se de que o código já está em um repositório GitHub.
2. Na barra lateral esquerda do VS Code, clique no ícone azul da **Azure**.
3. Na seção **Static Web Apps**, clique em **Sign in to Azure...** e faça login.
4. Clique no ícone de adição **"+" (Create Static Web App...)**.
5. Siga as perguntas no topo do VS Code:
   - **Nome:** `iris-ml-dashboard`
   - **Região:** Ex: `East US 2` ou `West US 2`
   - **Preset de Build:** Selecione **Vite** ou **Custom**
   - **App location (raiz da aplicação):** `/`
   - **Api location:** Deixe vazio (aperte `Enter`)
   - **Output location (pasta do build):** `dist`
6. A extensão criará automaticamente o arquivo `.github/workflows/azure-static-web-apps-*.yml` e fará o deploy automático via GitHub Actions!
7. Ao término da ação, a Azure gerará sua URL pública (ex: `https://white-wave-xxx.azurestaticapps.net`).

---

## 📡 Detalhes da API de Machine Learning

- **Endpoint:** `POST https://mlteste-a5akend9ach6c3h0.westus3-01.azurewebsites.net/api/predict`
- **Cabeçalhos:** `Content-Type: application/json`, `Accept: application/json`

### Exemplo de Payload:
```json
{
  "sepal_length": 6.7,
  "sepal_width": 3.0,
  "petal_length": 5.2,
  "petal_width": 2.3
}
```

### Exemplo de Retorno:
```json
{
  "codigo": 2,
  "dados_recebidos": {
    "petal_length": 5.2,
    "petal_width": 2.3,
    "sepal_length": 6.7,
    "sepal_width": 3.0
  },
  "predicao": "Virginica"
}
```
