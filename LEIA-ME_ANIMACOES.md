# VORZAX — Cinema + tecnologia em movimento

**Status:** protótipo integrado e restrito à branch de revisão. Não foi feito deploy de produção.

## O que foi produzido
- Dois filmes originais curtos, sem áudio, em WebM e MP4 com posters JPEG de reserva.
- A marca visual utiliza a imagem de logo oficial fornecida pelo fundador (recorte em resolução limitada; recomenda-se substituir futuramente por arquivo vetorial da própria empresa, quando disponível).
- Quatro demos interativas distintas: sistema de projetos com mudança de status; automação com fluxo e progressão; BI com filtros reais; simulação de responsividade desktop/mobile.
- Links na navegação para a seção "Demonstrações".
- Todos os conteúdos são **demonstrações conceituais**. Indicadores exibidos são fictícios, e não há nomes de clientes, depoimentos, resultados ou cases inventados.

## Performance e acessibilidade
- Vídeos otimizados: WebM e MP4, resolução 960 × 540, 15 quadros por segundo, 8 segundos.
- Sem áudio, carregamento sob demanda, posters, reprodução apenas na área visível e botão de pausa.
- A preferência `prefers-reduced-motion` é respeitada (sem autoplay; usuário pode iniciar manualmente).
- Animações de interface são CSS/SVG leves e não dependem de bibliotecas externas.
- Sem integrações reais: dados e tarefas são totalmente locais e ilustrativos.

## Antes de publicar
1. Comparar visualmente a prévia em desktop e celular.
2. Testar `npm ci`, `npm run lint`, `npm run build` e rotas protegidas.
3. Homologar Supabase e fluxo comercial separadamente; não usar dados reais na prévia.
4. Revisar o PR de animações; não mesclar nem promover para produção sem aprovação.
