# Projeto Consulta CNPJ (Angular + Python)

Projeto full stack com:

- Front-end em Angular (`frontend`)
- Back-end em FastAPI (`backend`)

O backend consulta a API publica da ReceitaWS:
<https://receitaws.com.br/v1/cnpj/>

## 1) Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

Execute:

```bash
uvicorn app.main:app --reload --port 8000
```

## 2) Frontend

```bash
cd frontend
npm install
npm start
```

Acesse: <http://localhost:4200>

## Deploy

Passo a passo completo em `DEPLOY.md`.
