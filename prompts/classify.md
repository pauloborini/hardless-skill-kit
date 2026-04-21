# Classify

## Objetivo

Classificar cada fragmento por papel operacional.

## Papéis permitidos

- `index`
- `rules`
- `reference`
- `memory`
- `manifest`
- `unknown`

## Regras

- usar `rules` para norma obrigatória ou recorrente;
- usar `index` para roteamento e seleção de contexto;
- usar `reference` para apoio e exemplo;
- usar `memory` para preferência complementar persistente;
- usar `manifest` para metadados de rastreabilidade e validação;
- usar `unknown` quando a confiança for insuficiente.

## Saída mínima

- papel candidato;
- confiança;
- ambiguidade;
- motivo curto da escolha.
