import { Button, Stack, TextField } from "@mui/material"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from "react-csv";
import { useTasks } from "../contexts/TaskContext";
import { useModal } from "../contexts/ModalContext";
import TaskModal from "./modals/TaskModal";
import Papa from 'papaparse';
import { validateImportFile } from '../utils/utils';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "./modals/ConfirmationModal";
import { toast } from "react-toastify";
import { addMultipleTasks, updateManyTasks } from "../firebase/tasksCRUD";
import { useUser } from "../contexts/UserContext";
import { useLocation } from "react-router-dom";
import DoneAllIcon from '@mui/icons-material/DoneAll';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ActionButtons: React.FC = () => {
    const { setLoading } = useUser()
    const { tasks, search, setSearch, fetchTasks } = useTasks();
    const { openModal } = useModal();
    const location = useLocation();

    const handleOpenTaskModal = () => {
        openModal(<TaskModal />)
    };

    const handleOpenFinishSprintModal = () => {
        const updatedTask = tasks
            .filter(task => (task.kanbanColumn !== 'backlog' && task.kanbanColumn !== 'finish'))
            .map(task => ({id: task.id!, data: {kanbanColumn: 'finish'}}))

        openModal(<ConfirmationModal 
            label="Deseja finalizar a Sprint? (Todas as tarefas do quadro serão definidas como finalizadas)" 
            handleConfirmation={() => {updateManyTasks(updatedTask).then(() => {fetchTasks()})}}/>)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (Array.isArray(results.data) && results.data.every(validateImportFile)) {
                        setLoading(true)
                        addMultipleTasks(results.data.map(({ id, ...rest }) => rest)).then(() => { fetchTasks() })
                    } else {
                        toast.error('O arquivo CSV não contém dados válidos conforme a interface Task.')
                    }
                },
            });
        }
    };


    return <Stack direction={'row'} spacing={2} m={2} flexWrap={'wrap'} useFlexGap>
        <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => handleOpenTaskModal()}
        >
            Criar Tarefa
        </Button>
        <TextField
            label={'Search'}
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            size="small"
        />
        <CSVLink data={tasks} target="_blank" filename={"tasks.csv"}>
            <Button variant='contained' startIcon={<FileDownloadIcon />}>
                Exportar CSV
            </Button>
        </CSVLink>
        <Button
            size="small"
            component="label"
            role={undefined}
            tabIndex={-1}
            variant='contained'
            startIcon={<FileUploadIcon />}
        >
            Importar CSV
            <VisuallyHiddenInput type="file" accept=".csv" onChange={handleFileUpload} />
        </Button>
        {
            location.pathname === '/kanban' &&
            <Button
                variant='contained'
                startIcon={<DoneAllIcon />}
                onClick={() => handleOpenFinishSprintModal()}
            >
                Finalizar sprint
            </Button>
        }
    </Stack>

}

export default ActionButtons;
