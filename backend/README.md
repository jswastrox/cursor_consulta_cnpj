# Backend - Consulta CNPJ

API em FastAPI para consultar CNPJ na API ReceitaWS.

## Requisitos

- Python 3.11+

## Configuracao

1. Crie e ative o ambiente virtual:

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

2. Instale dependencias:

```bash
pip install -r requirements.txt
```

## Executar

```bash
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health` - health check
- `GET /api/consulta-cnpj/{cnpj}` - consulta um CNPJ
