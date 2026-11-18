# Checklist pré-contratual de segurança e dados

**Não é certificação nem resultado de pentest.** Campos devem receber evidências verificáveis antes de aprovar sistemas com risco.

## Dados e privacidade
- [ ] Classificar tipos de dados (pessoais, sensíveis, empresariais, públicos)
- [ ] Identificar finalidade, controlador/operador e minimização de dados
- [ ] Definir compartilhamentos, base aplicável, eventual DPA e retenção
- [ ] Evitar produção ou dados reais no primeiro protótipo
- [ ] Identificar procedimentos para direitos dos titulares e descarte

## Controles técnicos
- [ ] Ambientes dev/homologação/produção segregados
- [ ] Testar autenticação, MFA para admins onde disponível e revogação
- [ ] Rever RLS por entidade/organização e permissões de linha
- [ ] Guardar chaves em variáveis secretas; nunca `service_role` no cliente
- [ ] Verificar dependências, SAST/CI e revisão de código
- [ ] Testar fluxos críticos e concorrência; exigir transação em operações sensíveis
- [ ] Registrar audit log apropriado e proteger dados de log
- [ ] Descrever backup, restauração e objetivos de recuperação contratados

## Entrega e continuidade
- [ ] Documentar arquitetura e responsáveis
- [ ] Definir deploy com rollback e procedimento de incidente
- [ ] Comprovar escopo de suporte e plano de transição
- [ ] Registrar resultado de testes com data, ambiente e versão
- [ ] Homologar por escrito antes de liberar dados e produção
