# Frontend - Consulta CNPJ

Interface Angular para consultar CNPJ via backend FastAPI.

## Executar

```bash
npm install
npm start
```

App em: <http://localhost:4200>

> O backend deve estar rodando em `http://localhost:8000`.

## API por ambiente

- Desenvolvimento: `src/environments/environment.ts`
- Producao: `src/environments/environment.prod.ts`

Altere `apiBaseUrl` para a URL publica do backend antes do deploy do frontend.
