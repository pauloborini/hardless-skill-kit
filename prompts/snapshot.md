# Snapshot

## Objetivo

Congelar um inventário estável das fontes e unidades que seguirão para fragmentação.

## Regras

- não reinterpretar regras ainda;
- não classificar ainda o papel operacional final;
- registrar relação entre fonte bruta e unidades processáveis;
- atualizar `.hardless/manifests/run-state.json` para `currentPhase=snapshot`;
- ao iniciar, marcar `snapshot` como `in_progress`;
- ao concluir o inventário, marcar `snapshot` como `produced`;
- marcar `snapshot` como `validated` quando o mapa cobrir todas as fontes relevantes encontradas em `discover`.

## Saída mínima

- mapa entre cada fonte e suas unidades processáveis;
- indicação de fontes fora de escopo ou vazias;
- atualização do checkpoint da fase.
