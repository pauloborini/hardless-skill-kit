# Validate

## Objetivo

Verificar se o pacote final atende o contrato mínimo do kit.

## Checklist

- existe `AGENTS.md`;
- `AGENTS.md` é centralizador e enxuto;
- `AGENTS.md` aponta corretamente para o novo método de desenvolvimento;
- `AGENTS.md` contém workflow, precedência e roteamento, não regras de domínio;
- `AGENTS.md` possui triagem, seleção de tipo, pré-confirmação, anti-loop e validação final;
- a Fase 3 tenta ler `project-context/index/<tipo>.md`, bloqueia quando o índice obrigatório não existe e não força contexto por inferência;
- a Fase 4 emite pré-confirmação informativa a partir do índice já carregado e manda prosseguir sem aguardar aprovação;
- as categorias geradas têm papel operacional claro;
- as regras necessárias estão distribuídas de forma coerente em `project-context/`;
- regras obrigatórias foram preservadas em `project-context/rules/*`;
- índices em `project-context/index/*` apontam para regras e referências existentes;
- `project-context/index/diagnostic.md` aponta para `project-context/rules/diagnostic_rules.md` e essa regra existe no pacote gerado;
- fragmentos de referência foram preservados ou omitidos com justificativa;
- a nomenclatura é neutra;
- não há vazamento de identidade real;
- os arquivos seguem os schemas mínimos;
- a árvore final não depende de arquivo vazio para parecer completa.
- dependências externas citadas por `project-context/` foram registradas em `.hardless/manifests/external-references-report.json`, quando existirem;
- `.hardless/manifests/external-references-report.json`, quando existir, satisfaz `schemas/external-references-report.schema.json`;
- `.hardless/manifests/run-state.json` existe e distingue corretamente `in_progress`, `produced`, `validated` e `failed`;
- pendências, conflitos e ambiguidades restantes estão explicitados.

## Status possíveis

- `valid`
- `degraded`
- `blocked`

## Regras

- usar `degraded` quando o pacote é útil, mas há lacunas ou conflito controlado;
- usar `blocked` quando faltar estrutura essencial ou houver risco relevante;
- nunca mascarar conflito sério como apenas observação cosmética.
- usar `blocked` quando `AGENTS.md` receber regras que deveriam estar em `project-context/rules/*`;
- usar `blocked` quando o workflow de triagem e pré-confirmação estiver ausente;
- usar `blocked` quando qualquer índice listar regra obrigatória inexistente, especialmente `diagnostic_rules.md`;
- usar `degraded` quando houver fragmentos relevantes sem destino claro, mas o pacote ainda for operável;
- usar `degraded` quando houver dependências externas legítimas ainda não internalizadas, mesmo com relatório completo;
- usar `blocked` quando houver dependências externas quebradas ou não reportadas;
- usar `blocked` quando o `run-state.json` impedir determinar com segurança quais fases estão realmente validadas;
- nunca tratar fase `produced` como equivalente a `validated`;
- ao iniciar `validate`, marcar a fase como `in_progress` em `.hardless/manifests/run-state.json`;
- ao concluir, marcar `validate` como `produced` e depois `validated` quando todos os checks mínimos estiverem consistentes;
- em `export/apply`, marcar `export_apply` como `in_progress`, depois `produced` e `validated` quando os artefatos finais forem realmente gravados;
- em `closeout-review`, marcar `closeout_review` como `in_progress`, depois `produced` e `validated` quando o relatório final ao usuário estiver consistente com os manifests;
- ao final, produzir uma revisão objetiva de fechamento com:
  - pendências em aberto;
  - decisão recomendada para cada pendência relevante;
  - confirmação do estado de `AGENTS.md`;
  - confirmação do estado da pasta `project-context/`;
  - resumo explícito das referências externas encontradas e do que deveria ser internalizado;
  - confirmação de que a retomada futura pode começar após a última fase `validated`;
  - conclusão final: `ready`, `degraded-but-usable` ou `needs-followup`.
