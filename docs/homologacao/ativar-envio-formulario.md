# Envio direto de propostas — ativação controlada

A página \`/solicitar-proposta\` está funcional mesmo sem backend de e-mail: o visitante prepara uma mensagem que precisa enviar manualmente pelo seu aplicativo. **Sem os três segredos abaixo, não há envio automático.**

## Como ativar sem expor credenciais
1. Criar uma conta no provedor Resend, avaliar o plano gratuito e verificar o domínio remetente (DNS), com a titularidade da Vorzax.
2. Na Vercel, definir **variáveis privadas** nos ambientes adequados, sem mostrar os valores em código, screenshots ou conversas:
   - \`RESEND_API_KEY\`: chave restrita do provedor
   - \`CONTACT_FROM_EMAIL\`: remetente autorizado/verificado, por exemplo \`Vorzax <contato@vorzax.com.br>\` **somente após validar o domínio**
   - \`CONTACT_FORM_ENABLED\`: \`true\` (ativa o endpoint)
3. Redeploy no ambiente de prévia. Consultar o status público \`GET /api/contato\`: retorna apenas \`{"direct":true}\` quando configurado.
4. Testar com dados próprios, verificar entrega no destino \`contato@vorzax.com.br\`, spam, bounce e resposta ao remetente. **Não habilitar produção sem esse teste.**
5. Monitorar abuso. Há honeypot, validação, checagem de origem, limite por instância e limite do provedor; para tráfego maior, adicionar **rate limiting distribuído** e desafio anti-bot. O contador por instância não garante limite global em serverless.

## Segurança e privacidade
- Mensagens são enviadas somente pelo servidor; a chave nunca chega ao navegador.
- Não enviar dados sensíveis no primeiro contato; a página orienta sobre isso.
- Política de privacidade informa o fluxo por serviço transacional **quando habilitado**.
- Falhas de envio não mostram confirmação enganosa: o visitante recebe alternativa por e-mail.
- A resposta \`accepted\` significa que o provedor aceitou a mensagem, **não** que a entrega à caixa de destino foi confirmada.

## Reversão
Remover/alterar \`CONTACT_FORM_ENABLED\`, redeploy e confirmar \`{"direct":false}\`. O fluxo manual continua disponível.
