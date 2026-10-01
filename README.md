# ONG Esperança

Aplicação Front-End acadêmica para apresentar uma ONG fictícia, divulgar projetos sociais e cadastrar pessoas voluntárias. Os contatos, indicadores, histórias, valores de doação e demais informações institucionais são fictícios e existem exclusivamente para demonstrar o funcionamento do projeto.

## Objetivo

Demonstrar HTML5 semântico, CSS responsivo, JavaScript modular, acessibilidade, validação de formulários, persistência local, navegação e organização para versionamento e publicação.

## Tecnologias

- React 19, TypeScript, TanStack Start e TanStack Router na aplicação principal
- HTML5, CSS3 e JavaScript ES6 na versão acadêmica estática
- Tailwind CSS 4 e variáveis CSS
- Zod para validação na aplicação principal
- `localStorage` para persistência apenas no navegador

## Estrutura

- `src/routes/`: páginas principais Início, Projetos e Cadastro
- `src/components/`: cabeçalho, rodapé e controles reutilizáveis
- `src/lib/`: validação, máscaras e armazenamento local
- `src/assets/`: imagens usadas pela aplicação principal
- `html/`: páginas acadêmicas `index.html`, `projetos.html` e `cadastro.html`
- `css/`: sistema visual e regras responsivas da versão acadêmica
- `js/`: navegação, formulário, armazenamento e templates em módulos ES6
- `imagens/`: símbolo SVG e imagens WebP otimizadas da versão acadêmica

## Funcionalidades

- Três páginas com navegação compatível com voltar e avançar do navegador
- Projetos renderizados a partir de uma estrutura de dados
- Menu adaptável a telas pequenas
- Formulário com validação, mensagens claras e máscaras de CPF, telefone e CEP
- Persistência e restauração do último cadastro no mesmo dispositivo
- Modal acessível com controle de foco e fechamento pelo teclado na aplicação principal
- Tratamento visual de rota inexistente

## Acessibilidade

O projeto usa regiões semânticas, hierarquia de títulos, texto alternativo, labels associados, link para pular ao conteúdo, foco visível, alvos de toque adequados, mensagens anunciadas e atributos ARIA. Os controles podem ser usados por teclado e movimentos são reduzidos conforme a preferência do sistema.

## Responsividade

O layout utiliza Grid de 12 colunas e Flexbox. Há ajustes aproximados para 400, 576, 768, 992, 1200 e 1440 pixels, cobrindo celulares, tablets, notebooks e telas grandes.

## Como executar

### Aplicação principal

```bash
bun install
bun run dev
```

Abra o endereço exibido no terminal. Para a versão acadêmica, acesse `/html/index.html` pelo mesmo servidor. Módulos ES6 exigem um servidor local; não abra os arquivos diretamente com `file://`.

## Como testar

1. Visite Início, Projetos e Voluntariado e teste todos os links.
2. Use voltar e avançar do navegador.
3. Envie o formulário vazio e depois com valores inválidos.
4. Confira as máscaras de CPF, telefone e CEP durante a digitação.
5. Preencha dados válidos, aceite os termos e envie.
6. Recarregue a página e confirme que o último cadastro reaparece.
7. Navegue apenas com Tab, Shift+Tab, Enter, Espaço e Escape.
8. Repita em celular, tablet e desktop, verificando que não há rolagem horizontal.
9. Abra o console do navegador e confirme a ausência de erros.

Os dados ficam somente no navegador. Não são enviados para servidor e não devem incluir senhas ou informações além das solicitadas no formulário.

## Build e publicação

```bash
bun run build
bun run preview
```

O resultado pode ser publicado pela Lovable, Vercel ou plataforma equivalente compatível com TanStack Start. Durante o build, as pastas acadêmicas são copiadas para a saída pública, mantendo `/html/index.html` disponível também após o deploy. Nenhuma URL de repositório ou publicação é informada porque ela ainda não foi criada.

## Versionamento

- `main`: versão estável
- `develop`: integração do desenvolvimento
- `feature/*`: novas funcionalidades
- Prefixos recomendados: `feat:`, `fix:`, `docs:`, `refactor:` e `release:`

Crie uma branch por alteração, use mensagens semânticas e abra um pull request antes de integrar à branch estável. O repositório não inclui dependências geradas nem arquivos de ambiente.
