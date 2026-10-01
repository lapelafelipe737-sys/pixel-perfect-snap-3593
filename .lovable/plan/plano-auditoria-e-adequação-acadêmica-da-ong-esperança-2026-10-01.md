# Plano — auditoria e adequação acadêmica da ONG Esperança

## Resultado da auditoria

A aplicação atual funciona e já cobre as três páginas, identidade visual, máscaras, validação básica, navegação e armazenamento local. Os principais requisitos pendentes são: estrutura acadêmica explícita, idioma `pt-BR`, mensagem e aceite de termos no formulário, restauração dos dados após recarregar, acessibilidade completa do formulário e modal, breakpoints solicitados, documentação e testes finais.

Os contatos, indicadores e valores serão mantidos como conteúdo fictício coerente com a natureza acadêmica do projeto e serão identificados como tal no README.

## Implementação

1. **Preservar a aplicação atual**
   - Manter React, TanStack e as rotas `/`, `/projetos` e `/cadastro` funcionando.
   - Corrigir o idioma do documento e qualquer problema encontrado na auditoria.

2. **Completar o formulário**
   - Adicionar mensagem e aceite obrigatório dos termos.
   - Validar todos os campos com regras HTML e Zod, incluindo limites e CPF válido.
   - Expor erros com `aria-invalid`, `aria-describedby` e foco no primeiro campo inválido.
   - Salvar apenas os dados necessários e restaurar o último cadastro ao retornar ou recarregar a página.
   - Tratar dados locais corrompidos sem quebrar a página.

3. **Completar interação e acessibilidade**
   - Garantir eventos de clique, envio, entrada e alteração.
   - Tornar o modal acessível por teclado, com foco inicial, fechamento por Escape e retorno do foco.
   - Validar menu, links, voltar/avançar, rota inexistente e ausência de rolagem horizontal.

4. **Atender à estrutura acadêmica obrigatória**
   - Criar na raiz `html/`, `css/`, `js/` e `imagens/` como versão acadêmica funcional do mesmo projeto, sem remover a aplicação atual.
   - Incluir `index.html`, `projetos.html`, `cadastro.html`, `style.css`, `responsive.css`, `main.js`, `navegacao.js`, `formulario.js`, `storage.js` e `templates.js`.
   - Implementar nessa versão HTML semântico, módulos ES6, projetos por dados com template literals, `map()` e `join()`, History API, `pushState`, `popstate`, rota inexistente, máscaras, validação e localStorage.
   - Reutilizar as imagens existentes em formatos otimizados e adicionar o símbolo da ONG em SVG.

5. **Ajustar sistema visual e documentação**
   - Completar a paleta verde, azul e amarelo e os breakpoints aproximados de 400, 576, 768, 992, 1200 e 1440 px.
   - Remover arquivos realmente desnecessários apenas quando não houver uso ou dependência.
   - Expandir o README com objetivo, estrutura, funcionalidades, acessibilidade, responsividade, testes, versionamento, conteúdo fictício e publicação.

## Validação final

- Verificar compilação e diagnósticos.
- Testar as três páginas em desktop e celular.
- Testar formulário vazio, inválido e válido; máscaras; mensagens; aceite; persistência e restauração.
- Testar navegação, voltar/avançar, rota inexistente, teclado, modal, menu e console.
- Conferir item por item o checklist do arquivo enviado e registrar somente resultados realmente executados.

## Observação técnica

A base TanStack continuará sendo a aplicação principal exigida pelo ambiente. A estrutura acadêmica pedida será adicionada dentro do mesmo repositório como uma versão estática funcional, pronta para avaliação direta e exportação ao GitHub, sem criar outro projeto.
