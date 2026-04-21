# Hardless Skill Kit

Kit repo-native para transformar regras cruas do projeto em um pacote fragmentado, canônico e mais operacional para uso com LLM.

Este `README.md` é para pessoas.
O [SKILL.md](SKILL.md) é para a LLM.

## Objetivo

O `Hardless Skill Kit` existe para reduzir improviso quando um agente precisa trabalhar em cima de:

- `AGENTS.md` muito grande;
- regras espalhadas em vários arquivos;
- docs e specs heterogêneas;
- convenções pouco operacionais para contexto mínimo.

Em vez de tratar essas fontes como contrato cru de runtime, o kit orienta a LLM a:

1. descobrir as fontes;
2. fragmentar o material;
3. classificar por papel operacional;
4. sintetizar uma estrutura canônica;
5. validar a saída antes de concluir.

## O Que Tem Aqui

- [SKILL.md](SKILL.md)
  - entrypoint procedural para a LLM
- `prompts/`
  - instruções curtas por fase
- `templates/`
  - estrutura canônica de saída
- `references/`
  - referências neutras e exemplos de forma
- `schemas/`
  - contratos mínimos para fragmentos e artefatos
- `manifests/`
  - política de nomenclatura e metadados do kit
- `scripts/`
  - validação mínima do próprio kit

## Para Quem É

Use este kit quando você quer:

- organizar melhor as instruções de um projeto;
- distribuir uma skill com estrutura previsível;
- trabalhar por clone ou `.zip`;
- deixar claro o que o humano faz e o que a LLM faz.

Não use este kit esperando:

- frontend próprio;
- plugin de editor pronto;
- backend cloud;
- automação completa de todas as fases sem revisão humana.

## Instalação

### Opção 1: Clone

```bash
git clone https://github.com/pauloborini/hardless-skill-kit.git
cd hardless-skill-kit
```

### Opção 2: Zip

1. Baixe o `.zip` do repositório público.
2. Extraia a pasta.
3. Abra a pasta extraída no seu editor ou use como material de referência para o seu workspace.

## O Que O Humano Deve Fazer

1. Garantir que esta pasta esteja disponível no ambiente em que a LLM vai operar.
2. Ler este `README.md` para entender o fluxo.
3. Apontar a LLM para [SKILL.md](SKILL.md).
4. Fornecer as fontes cruas do projeto alvo.
5. Revisar o resultado quando a validação terminar em `degraded`.

## O Que A LLM Deve Fazer

1. Ler [SKILL.md](SKILL.md).
2. Seguir as fases na ordem definida.
3. Ler apenas os prompts, templates, references e schemas necessários para a fase atual.
4. Gerar uma saída canônica, pequena e neutra.
5. Bloquear a conclusão quando o contrato mínimo falhar.

## Estrutura Canônica Esperada

O kit orienta a geração de algo próximo disso:

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

Nem toda categoria precisa existir sempre.
`AGENTS.md` é obrigatório.

## Verificação

### Verificação mínima do kit

Se você estiver no repositório de desenvolvimento:

```bash
node products/hardless-skill-kit/scripts/validate-skill-kit.mjs
```

ou:

```bash
make skill-kit-dist-validate
```

### Montar distribuição local

```bash
make skill-kit-distribute
```

Isso gera:

- staging em `.distribution/hardless-skill-kit`
- zip em `.distribution/hardless-skill-kit.zip`

### Sincronizar com clone local do repositório público

```bash
make skill-kit-dist-sync SKILL_KIT_REPO_DIR=/caminho/para/hardless-skill-kit
```

## Fluxo Recomendado de Uso

1. humano posiciona o kit;
2. agente lê `SKILL.md`;
3. agente lê as fontes do projeto alvo;
4. agente executa `discover -> snapshot -> fragment -> classify -> synthesize -> validate -> export/apply`;
5. humano revisa o pacote final quando necessário.

## Guardrails Importantes

- nada distribuível pode citar projetos reais usados como inspiração;
- a árvore final não deve ser inventada livremente;
- categorias sem material suficiente devem ser omitidas;
- templates e references existem para reduzir deriva, não para serem copiados cegamente;
- `README.md` é para o humano, `SKILL.md` é para a LLM.

## Próximos Passos do Produto

Este kit ainda está em construção.
O foco atual é:

- fortalecer templates e references;
- melhorar a validação mínima;
- garantir distribuição pública simples e autocontida.
