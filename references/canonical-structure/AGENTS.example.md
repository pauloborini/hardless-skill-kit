Este é o ponto de entrada único para agentes neste projeto.

## Primeiro Passo

1. classificar o pedido;
2. carregar apenas o contexto mínimo necessário;
3. seguir a precedência do pacote fragmentado;
4. bloquear ou escalar quando houver ambiguidade relevante.

## Precedência

1. `AGENTS.md`
2. `agents/index/*`
3. `agents/rules/*`
4. `agents/reference/*`
5. `agents/memory/*`

## Fluxo

- pergunta sem alteração: discussão
- alteração pequena: fluxo curto
- alteração ampla: fluxo estruturado
- incerteza relevante: bloquear
