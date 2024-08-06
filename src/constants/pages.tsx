import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import GridViewIcon from '@mui/icons-material/GridView';
import SubjectIcon from '@mui/icons-material/Subject';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

export const privatePages = [
    {
        pathname: '/backlog',
        title: 'Backlog',
        icon: <SubjectIcon />
    },
    {
        pathname: '/matriz',
        title: 'Matriz de priorização',
        icon: <GridViewIcon />
    },
    {
        pathname: '/kanban',
        title: 'Quadro Kanban',
        icon: <ViewKanbanIcon />
    },
    {
        pathname: '/completed-tasks',
        title: 'Tarefas concluídas',
        icon: <PlaylistAddCheckIcon />
    },
]

export const publicPages = [
    {
        pathname: '/',
        title: 'Entrar',
    },
    {
        pathname: '/registrar',
        title: 'Registrar',
    }
]