import re
from typing import Any

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="API Consulta CNPJ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CnpjResponse(BaseModel):
    cnpj: str
    resultado: dict[str, Any]


def only_digits(value: str) -> str:
    return re.sub(r"\D", "", value or "")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/consulta-cnpj/{cnpj}", response_model=CnpjResponse)
async def consulta_cnpj(cnpj: str) -> CnpjResponse:
    cnpj_sanitizado = only_digits(cnpj)
    if len(cnpj_sanitizado) != 14:
        raise HTTPException(status_code=400, detail="CNPJ invalido. Informe 14 digitos.")

    consulta_url = f"https://receitaws.com.br/v1/cnpj/{cnpj_sanitizado}"

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(consulta_url)

    if response.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail=f"Erro na consulta da API ReceitaWS: {response.text}",
        )

    resultado = response.json()
    if resultado.get("status") == "ERROR":
        raise HTTPException(status_code=404, detail=resultado.get("message", "CNPJ nao encontrado."))

    return CnpjResponse(cnpj=cnpj_sanitizado, resultado=resultado)
