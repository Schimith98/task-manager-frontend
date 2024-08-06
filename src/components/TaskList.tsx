import { Box, Button, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { Task } from "../contexts/TaskContext";
import { DataGrid, GridColDef, GridPaginationModel, GridRowSelectionModel, GridToolbarContainer } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import StartIcon from '@mui/icons-material/Start';
import { useLocation } from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';
import { quadrants } from "../constants/quadrants";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    tasks: Task[],
    onEdit: (task: Task) => void,
    handleSendToSprint: (task: Task) => void
    handleSendManyToSprint: (tasksIds: GridRowSelectionModel) => void
    handleDeleteMany:  (tasksIds: GridRowSelectionModel) => void
}

const TaskList: React.FC<Props> = ({ tasks, onEdit, handleSendToSprint, handleSendManyToSprint, handleDeleteMany }) => {

    const location = useLocation();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 25,
        page: 0,
    });
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const theme = useTheme()

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Título', flex: 0.7, minWidth: 100 },
        { field: 'assignedTo', headerName: 'Responsável', flex: 0.7, minWidth: 100 },
        {
            field: 'priority', headerName: 'Prioridade', flex: 0.7, minWidth: 100,
            valueFormatter: (value) => quadrants.find(q => q.taskPriority === value)?.title,
        },
        { field: 'estimatedTime', headerName: 'Tempo estimado', flex: 0.5, minWidth: 100 },
        { field: 'spentTime', headerName: 'Tempo gasto', flex: 0.5, minWidth: 100 },
        { field: 'description', headerName: 'Descrição', flex: 1, minWidth: 100 },
        {
            field: 'action',
            headerName: 'Ações',
            flex: 0.5,
            renderCell: (params) => (
                <Stack direction={'row'} spacing={1}>
                    <Tooltip title='Editar' placement="top">
                        <IconButton
                            color="primary"
                            onClick={() => onEdit(params.row)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Enviar para sprint" placement="top">
                        <IconButton
                            color="primary"
                            onClick={() => handleSendToSprint(params.row)}
                        >
                            {location.pathname === '/backlog' && <StartIcon />}
                            {location.pathname === '/completed-tasks' && <UndoIcon />}
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    const CustomToolBar = () => {
        if (selectionModel.length > 0) {
            return (
                <GridToolbarContainer
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        marginLeft: '52px',
                        color: 'white',
                        zIndex: 1,
                        backgroundColor: theme.palette.primary.main,
                        padding: '8px'
                    }}
                >
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => handleDeleteMany(selectionModel)}
                        startIcon={<DeleteIcon />}
                    >
                        Remover
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => handleSendManyToSprint(selectionModel)}
                        startIcon={
                            location.pathname === '/backlog' ? <StartIcon /> :
                                location.pathname === '/completed-tasks' && <UndoIcon />
                        }
                    >
                        Enviar para sprint
                    </Button>
                </GridToolbarContainer>
            );
        }
        return <GridToolbarContainer></GridToolbarContainer>
    }

    return (
        <Box position={'relative'} bgcolor={"#ffffff"} p={2} borderRadius={6}>
            <DataGrid
                columns={columns}
                rows={tasks}
                autoHeight
                disableColumnMenu
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
                slots={{
                    toolbar: CustomToolBar,
                }}
            />
        </Box>
    );
};

export default TaskList;

