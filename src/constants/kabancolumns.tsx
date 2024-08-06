export const kanbanColumns = [
    {
        columnId: 'backlog',
        title: 'Lista de Pendências',
        description: [
            "Itens de trabalho que ainda não foram iniciados são listados.",
            "Esta coluna serve como uma lista de pendências que precisam ser tratadas pela equipe de desenvolvimento.",
            "Os itens geralmente são organizados por prioridade, facilitando a visualização das tarefas mais importantes.",
            "Ajuda na preparação para sprints, refletindo itens priorizados prontos para serem puxados para a próxima fase do fluxo de trabalho.",
            "Oferece transparência sobre o trabalho pendente para todos os membros da equipe e stakeholders."
        ]
    },
    {
        columnId: 'to-do',
        title: 'A Fazer',
        description: [
            "Itens de trabalho que foram selecionados para serem trabalhados no sprint atual.",
            "Os itens nesta coluna estão prontos para serem iniciados pela equipe.",
            "É o ponto de partida para tarefas que estão prestes a ser movidas para 'Em Progresso'."
        ]
    },
    {
        columnId: 'in-progress',
        title: 'Em Andamento',
        description: [
            "Itens de trabalho que estão atualmente sendo trabalhados pela equipe.",
            "Indica o trabalho ativo que está em andamento.",
            "A equipe puxa os itens de 'To Do' para esta coluna quando estão prontos para começar a trabalhar neles."
        ]
    },
    {
        columnId: 'review',
        title: 'Em Análise',
        description: [
            "Itens de trabalho que foram concluídos e estão aguardando revisão.",
            "Pode incluir revisões de código, testes de qualidade, ou revisões de funcionalidades.",
            "A equipe ou os stakeholders verificam a qualidade e a conformidade dos itens antes de movê-los para 'Done'."
        ]
    },
    {
        columnId: 'done',
        title: 'Pronto',
        description: [
            "Itens de trabalho que foram concluídos com sucesso.",
            "Indica que o trabalho foi finalizado e aprovado.",
            "Esses itens estão prontos para serem entregues ou já foram entregues aos stakeholders."
        ]
    },
    {
        columnId: 'finish',
        title: 'Finalizados',
        description: [
            "Itens de trabalho que foram entregues com sucesso.",
            "Indica que o trabalho foi finalizado e aprovado.",
            "Esses itens foram entregues aos stakeholders."
        ]
    }
];
