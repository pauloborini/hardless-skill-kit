# Canonical Structure Notes

## Objetivo

Descrever como interpretar a estrutura canônica sem amarrar o kit a um domínio específico.

## Leitura sugerida

- `AGENTS.md`
  - entrypoint humano e operacional do pacote gerado
- `agents/index/*`
  - roteadores por tipo de tarefa
- `agents/rules/*`
  - regras normativas e obrigatórias
- `agents/reference/*`
  - apoio, exemplos e contratos longos
- `agents/memory/*`
  - preferências complementares persistentes
- `.hardless/manifests/*`
  - rastreabilidade, cobertura e validação

## Regra central

A estrutura existe para reduzir improviso e custo de contexto.
Ela não existe para maximizar o número de arquivos.
