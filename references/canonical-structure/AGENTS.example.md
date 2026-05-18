Este é o ponto de entrada único para agentes neste projeto.

Este arquivo deve centralizar apenas workflow, precedência e roteamento.
As regras do projeto devem viver em `project-context/`.

## Fonte Canônica

- `project-context/index/*` roteia a leitura por tipo de tarefa;
- `project-context/rules/*` contém regras obrigatórias;
- `project-context/reference/*` contém apoio e exemplos;
- `project-context/memory/*` é complementar, nunca canônico.

## Primeiro Passo

1. classificar o tipo primário da tarefa;
2. tentar ler `project-context/index/<tipo>.md`;
3. bloquear com `Contexto incompleto` se o índice obrigatório não existir;
4. emitir pré-confirmação com arquivos a consultar e escopo;
5. só então ler regras e referências acionadas.

## Precedência

1. `AGENTS.md`
2. `project-context/index/<tipo>.md`
3. `project-context/rules/*`
4. `project-context/reference/*`
5. `project-context/memory/*`

## Regras De Fluxo

- pergunta sem pedido explícito de alteração: Modo Discussão;
- pedido de alteração: seguir fluxo estruturado por índice;
- não improvisar contexto sem índice válido;
- não colocar regras de domínio dentro do `AGENTS.md`;
- se `project-context/` citar arquivos externos, reportar essa dependência.
