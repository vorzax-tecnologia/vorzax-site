# Critérios de homologação — proposta proporcional ao risco

| Classe | Exemplos | Liberação mínima |
|---|---|---|
| Baixo risco | Site institucional sem dados internos | Escopo, identidade, prazo, contrato, testes responsivos, aceite |
| Moderado | Automação com dados não sensíveis | Itens anteriores + validação de API, logs, erros, rollback, permissões |
| Elevado | BI com dados internos | Segregação de acesso, retenção, backup e responsabilidades documentadas |
| Crítico | Sistemas operacionais/financeiros centrais | Análise de segurança, continuidade, restauração, concorrência, acesso, auditoria e SLA verificáveis |

## Bloqueadores comuns
- Evidências técnicas, integridade dos dados ou responsáveis inexistentes
- Certificações ou casos publicitários não verificáveis
- Acesso desnecessário a produção, chaves ou dados sensíveis
- Ausência de critérios verificáveis de aceite
- Requisitos críticos de recuperação ainda não testados

## Evidências exigidas antes de alegar capacidade
- URL de homologação, commit, execução CI, resultado de QA e relatório de correções
- Datas e responsáveis dos testes de acessibilidade e performance
- Simulação de restauração quando contratada
- Termo de aceite, sem confundir protótipo com implantação real
