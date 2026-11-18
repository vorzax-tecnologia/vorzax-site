# Requisito crítico: revisão e ativação de módulos precisam de transação única

**Estado: NÃO IMPLEMENTADO NO BANCO.** Não aplicar SQL não validado em produção.

## Problema identificado
`src/app/central/actions.ts` atualiza `module_requests` e `organization_modules` em duas chamadas Supabase separadas. A compensação em caso de falha diminui risco, porém não oferece atomicidade nem isolamento contra concorrência.

## Solução pretendida
1. Confirmar projeto Supabase conectado aos ambientes de produção e prévia SEM revelar segredos.
2. Inspecionar o esquema real: chaves, constraints, status, triggers, RLS, funções e permissões.
3. Criar rotina transacional no Postgres com autenticação e autorização validadas **dentro da operação**.
4. Trancar ou atualizar condicionalmente a solicitação pendente e ativar o módulo na mesma transação.
5. Retornar `not_found`, `already_processed`, `forbidden` ou `success` sem alterações parciais.
6. Revogar `EXECUTE` genérico. Se exigir `SECURITY DEFINER`, usar `search_path` fixo, referências qualificadas e checagem explícita de admin.
7. Testar dois administradores simultâneos, solicitação alterada, erro no segundo passo, falha de RLS e acessos não autorizados.
8. Só então alterar a Server Action para chamar uma única RPC e publicar com rollback.

## Por que não foi implementado agora
Não há confirmação do identificador do Supabase utilizado pelo site. O projeto `vorzax-platform-dev` acessível na lista foi reportado como hibernado ao tentar inspecionar. Não alterar banco ou proclamar segurança concluída sem conexão e verificação.

Referência técnica: https://supabase.com/docs/guides/database/functions
