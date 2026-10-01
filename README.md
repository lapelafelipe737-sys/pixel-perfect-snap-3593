# ONG Esperança

Plataforma institucional responsiva para apresentar a ONG Esperança, divulgar projetos sociais e cadastrar pessoas voluntárias.

## Tecnologias

- React 19 e TypeScript
- TanStack Start e TanStack Router
- Tailwind CSS 4
- Zod para validação
- Lucide para ícones

## Estrutura

- `src/routes/`: páginas Início, Projetos e Cadastro
- `src/components/`: cabeçalho, rodapé e controles reutilizáveis
- `src/lib/`: validação, máscaras e armazenamento dos cadastros
- `src/assets/`: imagens otimizadas da aplicação
- `src/styles.css`: sistema visual e regras responsivas

## Como executar

```bash
bun install
bun run dev
```

A aplicação estará disponível no endereço informado pelo terminal.

## Produção e deploy

```bash
bun run build
bun run preview
```

O diretório gerado pelo comando de build pode ser publicado pela Lovable ou pelo provedor compatível com TanStack Start escolhido para o projeto.

## Dados do formulário

Os cadastros são validados no navegador e armazenados em `localStorage` com serialização JSON, conforme o escopo do projeto. Não há envio para servidor.

## Versionamento Git

Crie uma branch para cada alteração, use commits objetivos e abra um pull request antes de integrar à branch principal. O projeto não inclui dependências geradas nem arquivos de ambiente no repositório.