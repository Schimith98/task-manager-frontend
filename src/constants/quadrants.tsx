export const quadrants = [
    {
      taskPriority: 'quadrant-1',
      title: 'Urgente e Importante',
      description: [
        "Tarefas que devem ser tratadas imediatamente e não podem ser adiadas.",
        "Essas são as tarefas mais críticas e precisam de atenção prioritária.",
        "Exemplos: corrigir bugs críticos que estão causando falhas no sistema, implementar hotfixes para problemas de segurança, responder a incidentes que impactam os principais clientes."
      ]
    },
    {
      taskPriority: 'quadrant-2',
      title: 'Não Urgente e Importante',
      description: [
        "Tarefas que são importantes para os objetivos a longo prazo, mas não exigem ação imediata.",
        "Essas tarefas devem ser priorizadas e planejadas para evitar que se tornem urgentes.",
        "Exemplos: adicionar novas funcionalidades planejadas, refatorar partes do código para melhorar a manutenção, planejar e definir requisitos para futuras versões."
      ]
    },
    {
      taskPriority: 'quadrant-3',
      title: 'Urgente e Não Importante',
      description: [
        "Tarefas que exigem atenção imediata, mas não são importantes para alcançar os objetivos a longo prazo.",
        "Essas tarefas devem ser delegadas ou minimizadas sempre que possível.",
        "Exemplos: responder a e-mails de baixo impacto, resolver pequenos bugs que não afetam a funcionalidade principal, atender a solicitações de funcionalidades menores que podem ser adiadas."
      ]
    },
    {
      taskPriority: 'quadrant-4',
      title: 'Não Urgente e Não Importante',
      description: [
        "Tarefas que são distrações e não contribuem para os objetivos a longo prazo.",
        "Essas tarefas devem ser evitadas ou eliminadas.",
        "Exemplos: discutir detalhes triviais sobre backlog sem tomar decisões, revisar constantemente o backlog sem priorizar, envolver-se em debates sobre funcionalidades não essenciais."
      ]
    }
  ];
  