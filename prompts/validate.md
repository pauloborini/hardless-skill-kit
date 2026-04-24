# Validate

## Objetivo

Verificar se o pacote final atende o contrato mínimo do kit.

## Checklist

- existe `AGENTS.md`;
- `AGENTS.md` é centralizador e enxuto;
- `AGENTS.md` aponta corretamente para o novo método de desenvolvimento;
- `AGENTS.md` contém workflow, precedência e roteamento, não regras de domínio;
- `AGENTS.md` possui triagem, seleção de tipo, pré-confirmação, anti-loop e validação final;
- as categorias geradas têm papel operacional claro;
- as regras necessárias estão distribuídas de forma coerente em `agents/`;
- regras obrigatórias foram preservadas em `agents/rules/*`;
- índices em `agents/index/*` apontam para regras e referências existentes;
- fragmentos de referência foram preservados ou omitidos com justificativa;
- a nomenclatura é neutra;
- não há vazamento de identidade real;
- os arquivos seguem os schemas mínimos;
- a árvore final não depende de arquivo vazio para parecer completa.
- pendências, conflitos e ambiguidades restantes estão explicitados.

## Status possíveis

- `valid`
- `degraded`
- `blocked`

## Regras

- usar `degraded` quando o pacote é útil, mas há lacunas ou conflito controlado;
- usar `blocked` quando faltar estrutura essencial ou houver risco relevante;
- nunca mascarar conflito sério como apenas observação cosmética.
- usar `blocked` quando `AGENTS.md` receber regras que deveriam estar em `agents/rules/*`;
- usar `blocked` quando o workflow de triagem e pré-confirmação estiver ausente;
- usar `degraded` quando houver fragmentos relevantes sem destino claro, mas o pacote ainda for operável;
- ao final, produzir uma revisão objetiva de fechamento com:
  - pendências em aberto;
  - decisão recomendada para cada pendência relevante;
  - confirmação do estado de `AGENTS.md`;
  - confirmação do estado da pasta `agents/`;
  - conclusão final: `ready`, `degraded-but-usable` ou `needs-followup`.
