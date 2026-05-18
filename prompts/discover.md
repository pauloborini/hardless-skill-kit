# Discover

## Objetivo

Descobrir as fontes cruas do usuário antes de qualquer reorganização.

## O que procurar

- `AGENTS.md`
- `CLAUDE.md`
- `.cursorrules`
- specs
- docs arquiteturais
- guias de workflow
- convenções de projeto

## Regras

- registrar fontes encontradas e ausentes;
- não preencher lacunas silenciosamente;
- não interpretar ainda o papel operacional final;
- detectar monólitos, contradições e material redundante.
- detectar referências a arquivos externos que possam virar dependências do `project-context/`.
- inicializar `.hardless/manifests/run-state.json` com objeto completo e válido pelo schema;
- ao iniciar, marcar `discover` como `in_progress`;
- ao concluir o inventário inicial, marcar `discover` como `produced`;
- marcar `discover` como `validated` quando fontes encontradas, ausentes e riscos iniciais estiverem coerentes.

## Saída mínima

- inventário de fontes;
- notas de estrutura;
- possíveis riscos para fragmentação.
- lista preliminar de dependências externas relevantes, se existirem.
- checkpoint inicial de execução.
