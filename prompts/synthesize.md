# Synthesize

## Objetivo

Montar a estrutura final usando os templates canônicos do kit.

O `AGENTS.md` final deve ser o dono do workflow e do roteamento.
As regras do projeto devem ficar em `agents/rules/*`.
Exemplos, contratos longos e detalhes auxiliares devem ficar em `agents/reference/*`.

## Regras

- começar por `AGENTS.md`;
- usar `templates/AGENTS.md.template` como base operacional do `AGENTS.md`;
- manter `AGENTS.md` focado em workflow, precedência, triagem, pré-confirmação e anti-loop;
- garantir que a Fase 3 tente ler e validar `agents/index/<tipo>.md` antes da pré-confirmação;
- garantir que a Fase 4 use o índice já carregado para listar regras/referências acionadas e não pause aguardando aprovação;
- não colocar regras de domínio, UI, arquitetura, segurança ou contrato diretamente em `AGENTS.md`;
- gerar apenas categorias sustentadas pelo material disponível;
- preferir nomes previsíveis e neutros;
- manter a árvore pequena e orientada por papel operacional;
- não despejar tudo no `AGENTS.md`;
- não criar arquivos vazios.
- não transformar regras específicas em resumo genérico;
- não perder checklists, proibições, precedências ou exceções presentes nas fontes;
- quando houver material suficiente, criar regra específica em `agents/rules/*` em vez de esconder no índice.

## Cobertura Obrigatória

Antes de concluir a síntese:

1. conferir se todo fragmento `rules` foi para algum arquivo em `agents/rules/*`;
2. conferir se todo fragmento `index` foi refletido em algum `agents/index/*`;
3. conferir se todo fragmento `reference` foi para `agents/reference/*` ou foi omitido com justificativa;
4. registrar fragmentos `unknown`, conflitantes ou de baixa confiança como pendência;
5. confirmar que `AGENTS.md` não virou depósito de regras.

## Índices Recomendados

Gerar apenas índices sustentados pelo material disponível, usando estes nomes quando aplicável:

- `agents/index/feature.md`
- `agents/index/ui.md`
- `agents/index/contract.md`
- `agents/index/navigation.md`
- `agents/index/shared.md`
- `agents/index/security.md`
- `agents/index/diagnostic.md`
- `agents/index/refactoring.md`
- `agents/index/testing.md`

## Regras Recomendadas

Gerar apenas arquivos sustentados pelo material disponível, usando nomes previsíveis:

- `agents/rules/architecture_rules.md`
- `agents/rules/operational_rules.md`
- `agents/rules/feature_rules.md`
- `agents/rules/diagnostic_rules.md`
- `agents/rules/ui_rules.md`
- `agents/rules/contract_rules.md`
- `agents/rules/navigation_rules.md`
- `agents/rules/shared_rules.md`
- `agents/rules/security_rules.md`

## Ordem recomendada

1. `AGENTS.md`
2. `agents/index/*`
3. `agents/rules/*`
4. `agents/reference/*`
5. `agents/memory/*`
6. `.hardless/manifests/*`
