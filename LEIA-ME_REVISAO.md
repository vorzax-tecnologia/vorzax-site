# Vorzax — revisão isolada (PR #1)

**NÃO PUBLICAR / NÃO FAZER MERGE.**

Origem: ZIP fornecido em 29/10/2026. Este pacote mantém os 38 arquivos originais; apenas três arquivos foram modificados:

- src/app/page.tsx — textos e CTAs generalistas, sem trocar fluxos do formulário.
- src/app/layout.tsx — título e descrição SEO.
- src/app/opengraph-image.tsx — textos da imagem social.

Rotas central, plataforma, sistema, login, privacidade, integrações Supabase e imagens permanecem byte a byte como no ZIP recebido.

**Não se trata de uma cópia comprovadamente idêntica da produção.** Foram detectadas diferenças de dependências e arquitetura entre o ZIP recebido e o deployment Vercel atual. Não publicar sem reconciliar essas diferenças, executar lint/build e testes com banco isolado.

O ZIP não contém `.env*`, tokens, `.next`, `node_modules` ou `.git`. Para revisar, extraia em uma nova pasta, sem substituir o projeto já existente no VS Code. Não faça `git pull`, `reset`, `push` ou deploy enquanto a revisão estiver pendente.

## Correção isolada de segurança

Aplicada a validação de redirecionamento após login (`src/lib/security/safe-redirect.ts`). Antes de publicar, revisar os pontos pendentes de Supabase e comparar com a produção.
