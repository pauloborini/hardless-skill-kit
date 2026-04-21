# Validate

## Objetivo

Verificar se o pacote final atende o contrato mínimo do kit.

## Checklist

- existe `AGENTS.md`;
- `AGENTS.md` é centralizador e enxuto;
- as categorias geradas têm papel operacional claro;
- a nomenclatura é neutra;
- não há vazamento de identidade real;
- os arquivos seguem os schemas mínimos;
- a árvore final não depende de arquivo vazio para parecer completa.

## Status possíveis

- `valid`
- `degraded`
- `blocked`

## Regras

- usar `degraded` quando o pacote é útil, mas há lacunas ou conflito controlado;
- usar `blocked` quando faltar estrutura essencial ou houver risco relevante;
- nunca mascarar conflito sério como apenas observação cosmética.
