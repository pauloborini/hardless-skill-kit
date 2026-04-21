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
agents/
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

Congele o inventário textual relevante antes de reorganizar.

Saída mínima:

- mapa entre fonte original e unidades processáveis.

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

### 7. Export/Apply

Se a validação terminar em `valid` ou `degraded`, prepare o pacote final.

O pacote final deve conter:

- `SKILL.md` não entra no pacote gerado para o projeto do usuário;
- `AGENTS.md` gerado;
- árvore `agents/` gerada;
- manifests de proveniência e validação em `.hardless/manifests/`, quando aplicável.

## Leituras obrigatórias por fase

- `discover`: `prompts/discover.md`, `manifests/naming-policy.json`
- `fragment`: `prompts/fragment.md`, `schemas/fragment.schema.json`
- `classify`: `prompts/classify.md`, `schemas/fragment.schema.json`
- `synthesize`: `prompts/synthesize.md`, `templates/`, `references/`
- `validate`: `prompts/validate.md`, `schemas/`, `manifests/`

## Guardrails

- não citar projetos reais em nenhum artefato distribuível;
- não copiar textos longos de exemplo sem neutralização;
- não criar categorias sem papel operacional claro;
- não inflar a árvore final com arquivos vazios;
- não marcar `valid` quando houver violação dos contratos mínimos;
- `AGENTS.md` deve ser centralizador e enxuto, não um depósito de todas as regras.

## Quando bloquear

Bloqueie a conclusão quando:

- faltar `AGENTS.md`;
- a classificação estiver majoritariamente ambígua;
- o pacote final depender demais de inferência fraca;
- houver vazamento de identidade real;
- os contratos mínimos dos `schemas/` não forem atendidos.
