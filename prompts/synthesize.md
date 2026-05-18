# Synthesize

## Objetivo

Montar a estrutura final usando os templates canônicos do kit.

O `AGENTS.md` final deve ser o dono do workflow e do roteamento.
As regras do projeto devem ficar em `project-context/rules/*`.
Exemplos, contratos longos e detalhes auxiliares devem ficar em `project-context/reference/*`.
Referências externas reais podem continuar existindo quando o projeto depender delas, mas devem ser detectadas, registradas e reportadas.

## Regras

- começar por `AGENTS.md`;
- usar `templates/AGENTS.md.template` como base operacional do `AGENTS.md`;
- manter `AGENTS.md` focado em workflow, precedência, triagem, pré-confirmação e anti-loop;
- garantir que a Fase 3 tente ler e validar `project-context/index/<tipo>.md` antes da pré-confirmação;
- garantir que a Fase 4 use o índice já carregado para listar regras/referências acionadas e não pause aguardando aprovação;
- não colocar regras de domínio, UI, arquitetura, segurança ou contrato diretamente em `AGENTS.md`;
- gerar apenas categorias sustentadas pelo material disponível;
- preferir nomes previsíveis e neutros;
- manter a árvore pequena e orientada por papel operacional;
- não despejar tudo no `AGENTS.md`;
- não criar arquivos vazios.
- não transformar regras específicas em resumo genérico;
- não perder checklists, proibições, precedências ou exceções presentes nas fontes;
- quando houver material suficiente, criar regra específica em `project-context/rules/*` em vez de esconder no índice.
- não prometer que `project-context/` está totalmente autocontido quando ainda houver dependências externas reais.
- ao iniciar a fase, marcar `synthesize` como `in_progress` em `.hardless/manifests/run-state.json`;
- ao terminar, registrar artefatos gerados e marcar a fase como `produced`.
- marcar `synthesize` como `validated` quando a árvore gerada tiver cobertura suficiente e os artefatos mínimos existirem.

## Cobertura Obrigatória

Antes de concluir a síntese:

1. conferir se todo fragmento `rules` foi para algum arquivo em `project-context/rules/*`;
2. conferir se todo fragmento `index` foi refletido em algum `project-context/index/*`;
3. conferir se todo fragmento `reference` foi para `project-context/reference/*` ou foi omitido com justificativa;
4. registrar fragmentos `unknown`, conflitantes ou de baixa confiança como pendência;
5. confirmar que `AGENTS.md` não virou depósito de regras.
6. registrar referências externas citadas por arquivos de `project-context/` em `.hardless/manifests/external-references-report.json`.

## Relatório De Dependências Externas

Quando qualquer arquivo em `project-context/` citar arquivo fora dessa pasta, gerar:

- `.hardless/manifests/external-references-report.json`

O relatório deve listar, no mínimo:

- `sourceFile`
- `referencedPath`
- `status`: `valid`, `missing`, `fragile`, `should-internalize`
- `reason`
- `recommendation`

O relatório deve ser compatível com `schemas/external-references-report.schema.json`.

## Regra De Retomada

Se a execução for interrompida:

- reler `.hardless/manifests/run-state.json`;
- retomar da última fase marcada como `validated`;
- reexecutar integralmente a fase que estiver em `in_progress`, `failed` ou apenas `produced`.

## Índices Recomendados

Gerar apenas índices sustentados pelo material disponível, usando estes nomes quando aplicável:

- `project-context/index/feature.md`
- `project-context/index/ui.md`
- `project-context/index/contract.md`
- `project-context/index/navigation.md`
- `project-context/index/shared.md`
- `project-context/index/security.md`
- `project-context/index/diagnostic.md`
- `project-context/index/refactoring.md`
- `project-context/index/testing.md`

## Regras Recomendadas

Gerar apenas arquivos sustentados pelo material disponível, usando nomes previsíveis:

- `project-context/rules/architecture_rules.md`
- `project-context/rules/operational_rules.md`
- `project-context/rules/feature_rules.md`
- `project-context/rules/diagnostic_rules.md`
- `project-context/rules/ui_rules.md`
- `project-context/rules/contract_rules.md`
- `project-context/rules/navigation_rules.md`
- `project-context/rules/shared_rules.md`
- `project-context/rules/security_rules.md`

## Ordem recomendada

1. `AGENTS.md`
2. `project-context/index/*`
3. `project-context/rules/*`
4. `project-context/reference/*`
5. `project-context/memory/*`
6. `.hardless/manifests/*`
