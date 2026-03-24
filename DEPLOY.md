# Deploy - Render (Backend) + Vercel (Frontend)

Guia rapido para publicar a aplicacao online.

## 1) Backend no Render

1. Acesse [Render](https://render.com/) e conecte seu GitHub.
2. Clique em **New +** -> **Web Service**.
3. Selecione o repositorio `cursor_consulta_cnpj`.
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Em **Environment Variables**, adicione:
   - `CORS_ORIGINS=https://seu-frontend.vercel.app`
6. Clique em **Create Web Service**.

Depois do deploy, valide:

- `https://SEU-BACKEND.onrender.com/health`

## 2) Frontend no Vercel

1. Acesse [Vercel](https://vercel.com/) e conecte seu GitHub.
2. Clique em **Add New...** -> **Project**.
3. Selecione o repositorio `cursor_consulta_cnpj`.
4. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend`
5. Antes de publicar, ajuste no arquivo `frontend/src/environments/environment.prod.ts`:

```ts
export const environment = {
  apiBaseUrl: 'https://SEU-BACKEND.onrender.com'
};
```

6. Commit/push desta alteracao e clique em **Deploy**.

## 3) Ajuste final de CORS

Com o dominio final do frontend publicado, atualize no Render:

- `CORS_ORIGINS=https://seu-frontend.vercel.app`

Se quiser manter ambiente local + producao:

- `CORS_ORIGINS=http://localhost:4200,https://seu-frontend.vercel.app`

## 4) Checklist de validacao

- Backend responde `GET /health` com `{"status":"ok"}`
- Frontend abre sem erro
- Consulta de CNPJ retorna tabela na pagina de resultado
- Sem erro de CORS no navegador

## 5) Problemas comuns

- **Erro CORS**: dominio do frontend nao esta em `CORS_ORIGINS`.
- **Erro 502 no frontend**: `apiBaseUrl` de producao incorreta.
- **Demora na primeira consulta**: plano free pode ter cold start.
