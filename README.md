# Vorzax Tecnologia — site institucional

Site institucional e laboratório de demonstrações da Vorzax Tecnologia.

## Stack

- Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4.
- Supabase para as áreas privadas `/sistema` e `/central`.
- Vercel para prévias e produção.

## Ambiente local

1. Instale Node.js compatível com a versão definida na Vercel (atualmente 24.x).
2. Execute `npm ci`.
3. Configure as variáveis Supabase em `.env.local` **somente no seu computador**, sem versionar chaves.
4. Execute `npm run dev` e abra `http://localhost:3000`.
5. Valide com `npm run lint` e `npm run build`.

Variáveis públicas utilizadas pelas áreas privadas: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ou `NEXT_PUBLIC_SUPABASE_ANON_KEY`). **Nunca** inclua a `service_role` em variáveis `NEXT_PUBLIC_`.

A compilação executa `scripts/sync-showcase-assets.mjs` para preparar fotografias e a marca. Esse passo ainda depende de arquivos externos e deve ser revisado antes da publicação definitiva.

## Principais caminhos

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/page.tsx` | Site institucional e contato |
| `src/components/ReferenceLanding.tsx` | Hero e vitrine de serviços |
| `src/components/TechnologyInMotion.tsx` | Laboratório de demonstrações |
| `src/components/demos/` | Telas demonstrativas |
| `src/app/plataforma/page.tsx` | Conceito de plataforma |
| `src/app/central/` | Administração (autenticada) |
| `src/app/sistema/` | Plataforma privada |
| `scripts/qa-laboratorio-visual.cjs` | Teste de enquadramento em desktop/mobile |

## Publicação segura

- Desenvolver alterações em branch específica, nunca diretamente na produção.
- Validar Vercel Preview, build, lint, demonstrações, formulário, navegação e dispositivos.
- Garantir que exemplos e dados ilustrativos estejam identificados como tais.
- Não editar tabelas reais ou habilitar módulos sem migração e testes de integridade.
- Obter aprovação expressa para mesclar a `main` e publicar em `www.vorzax.com.br`.

## Contatos

- Site: https://www.vorzax.com.br
- E-mail: contato@vorzax.com.br
