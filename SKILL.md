# Hardless Skill Kit

## Objetivo

Este kit transforma fontes cruas do usuário em um pacote fragmentado, canônico e repo-native.

Você deve operar com o seguinte pipeline:

1. `discover`
2. `snapshot`
3. `fragment`
4. `classify`
5. `synthesize`
6. `validate`
7. `export/apply`
8. `closeout-review`

## Estado De Execução

Durante o processo, a execução deve manter checkpoint em:

- `.hardless/manifests/run-state.json`

Esse arquivo é obrigatório sempre que houver trabalho multi-etapa, para permitir retomada confiável após interrupção.

## Regra central

Você não deve improvisar a árvore final livremente.

Antes de produzir qualquer artefato final:

- leia este `SKILL.md`;
- leia apenas os prompts da fase atual em `prompts/`;
- use `templates/` como alvo estrutural;
- use `schemas/` para restringir a forma da saída;
- use `references/` apenas como apoio;
- use `manifests/` para nomenclatura, política e metadados.

## Estrutura alvo

O pacote final deve seguir a estrutura canônica do kit:

```text
AGENTS.md
project-context/
  index/
  rules/
  reference/
  memory/
.hardless/
  manifests/
```

Categorias opcionais podem ser omitidas quando não houver material suficiente, mas `AGENTS.md` deve existir.

## Contrato de fragmentação

Classifique cada trecho do material bruto por papel operacional:

- `index`
  - roteamento por tipo de tarefa, ordem de leitura, gatilhos de contexto
- `rules`
  - comportamento obrigatório, recorrente ou normativo
- `reference`
  - exemplos, tabelas, contratos longos, apoio
- `memory`
  - preferência complementar persistente, sem caráter estrutural
- `manifest`
  - metadados de proveniência, cobertura, conflito ou validação

Se a classificação for fraca:

- marque como `unknown` ou baixa confiança;
- registre a ambiguidade;
- não force uma categoria arbitrária.

## Fases

### 1. Discover

Leia [prompts/discover.md](prompts/discover.md).

Saída mínima:

- lista de fontes encontradas;
- lista de fontes ausentes;
- observações de ambiguidade estrutural inicial.

### 2. Snapshot

Leia [prompts/snapshot.md](prompts/snapshot.md).

Congele o inventário textual relevante antes de reorganizar.

Saída mínima:

- mapa entre fonte original e unidades processáveis.
- checkpoint da fase em `.hardless/manifests/run-state.json`

### 3. Fragment

Leia [prompts/fragment.md](prompts/fragment.md).

Saída mínima:

- fragmentos menores com localização e texto bruto.

### 4. Classify

Leia [prompts/classify.md](prompts/classify.md).

Saída mínima:

- papel operacional candidato;
- confiança;
- ambiguidade.

### 5. Synthesize

Leia [prompts/synthesize.md](prompts/synthesize.md).

Saída mínima:

- mapa de cobertura entre fragmentos, classificação e arquivo de destino;
- proposta de `AGENTS.md`;
- proposta das categorias necessárias;
- lista de categorias omitidas por falta de material.

### 6. Validate

Leia [prompts/validate.md](prompts/validate.md).

Saída mínima:

- status `valid`, `degraded` ou `blocked`;
- conflitos;
- lacunas;
- risco de vazamento de identidade;
- aderência aos `schemas/`.
- atualização de checkpoint com fases `validated` vs `produced`.

### 7. Export/Apply

Se a validação terminar em `valid` ou `degraded`, prepare o pacote final.

O pacote final deve conter:

- `SKILL.md` não entra no pacote gerado para o projeto do usuário;
- `AGENTS.md` gerado;
- árvore `project-context/` gerada;
- manifests de proveniência e validação em `.hardless/manifests/`, quando aplicável.
- relatório de dependências externas em `.hardless/manifests/external-references-report.json`, quando `project-context/` citar arquivos fora da própria pasta.
- estado final de execução em `.hardless/manifests/run-state.json`.

### 8. Closeout Review

Depois de `export/apply`, você deve fazer uma revisão final do que acabou de gerar.

Saída mínima:

- lista de pendências restantes;
- decisões em aberto;
- recomendação objetiva para cada decisão relevante;
- confirmação de que os fragmentos relevantes têm destino no mapa de cobertura;
- confirmação do estado final de `AGENTS.md`;
- confirmação do estado final da pasta `project-context/`;
- aviso explícito ao usuário sobre referências externas encontradas em `project-context/`, com recomendação do que deveria ser internalizado;
- confirmação do estado final de `.hardless/manifests/run-state.json`;
- indicação clara se o resultado está `ready`, `degraded-but-usable` ou `needs-followup`.

## Leituras obrigatórias por fase

- `discover`: `prompts/discover.md`, `manifests/naming-policy.json`
- `snapshot`: `prompts/snapshot.md`
- `fragment`: `prompts/fragment.md`, `schemas/fragment.schema.json`
- `classify`: `prompts/classify.md`, `schemas/fragment.schema.json`
- `synthesize`: `prompts/synthesize.md`, `templates/`, `references/`
- `validate`: `prompts/validate.md`, `schemas/`, `manifests/`
- `closeout-review`: `prompts/validate.md`, `templates/`, artefatos gerados

## Guardrails

- não citar projetos reais em nenhum artefato distribuível;
- não copiar textos longos de exemplo sem neutralização;
- não criar categorias sem papel operacional claro;
- não inflar a árvore final com arquivos vazios;
- não marcar `valid` quando houver violação dos contratos mínimos;
- `AGENTS.md` deve ser centralizador e enxuto, não um depósito de todas as regras.
- regras de domínio, arquitetura, UI, contrato, segurança e operação devem ficar em `project-context/rules/*`, não no `AGENTS.md`.
- dependências externas de arquivos dentro de `project-context/` devem ser mapeadas e reportadas, não escondidas;
- fase `in_progress` nunca pode ser tratada como concluída após interrupção;
- fase só pode ser considerada retomável como concluída quando estiver marcada como `validated` em `.hardless/manifests/run-state.json`;
- não concluir síntese sem mapa de cobertura entre fragmentos e arquivos de destino.
- não encerrar o trabalho sem explicitar pendências ou confirmar que não há pendências relevantes.

## Quando bloquear

Bloqueie a conclusão quando:

- faltar `AGENTS.md`;
- a classificação estiver majoritariamente ambígua;
- o pacote final depender demais de inferência fraca;
- houver vazamento de identidade real;
- o estado de execução estiver corrompido ou inconsistente a ponto de impedir retomada segura;
- os contratos mínimos dos `schemas/` não forem atendidos.

## Fechamento obrigatório

Ao concluir o fluxo, você deve sempre:

- dizer se ainda existe pendência;
- recomendar uma decisão quando houver ambiguidade ou conflito;
- revisar se `AGENTS.md` já centraliza corretamente o novo método;
- revisar se `AGENTS.md` não recebeu regras que deveriam estar em `project-context/rules/*`;
- revisar se a pasta `project-context/` contém as regras necessárias;
- revisar se dependências externas de `project-context/` foram registradas em `.hardless/manifests/external-references-report.json`;
- revisar se `.hardless/manifests/run-state.json` marca corretamente fases `validated`, `produced`, `in_progress` ou `failed`;
- revisar se o mapa de cobertura explica o destino das regras relevantes;
- dizer explicitamente se o pacote final já pode ser considerado utilizável.
