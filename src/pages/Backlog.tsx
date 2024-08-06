import { Box } from "@mui/material";
import TaskList from "../components/TaskList";
import { Task, useTasks } from "../contexts/TaskContext";
import { deleteTasksByIds, updateManyTasks, updateTask } from "../firebase/tasksCRUD";
import { useModal } from "../contexts/ModalContext";
import { useCallback, useMemo } from "react";
import TaskModal from "../components/modals/TaskModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { GridRowSelectionModel } from "@mui/x-data-grid";

const Backlog: React.FC = () => {

  const { tasks, setSelectedTask, fetchTasks, search } = useTasks();
  const { openModal } = useModal();

  const handleOpenTaskModal = useCallback((task: Task | null = null) => {
    openModal(<TaskModal />);
    setSelectedTask(task);
  }, [openModal, setSelectedTask]);

  const handleSendToSprint = (task: Task) => {
    updateTask(task.id!, { ...task, kanbanColumn: 'to-do' }).then(() => fetchTasks());
  }

  const handleSendManyToSprint = (tasksIds: GridRowSelectionModel) => {
    let message = ''
    if (tasksIds.length > 1) {
      message = `Deseja enviar ${tasksIds.length} tarefas para a sprint?`
    } else {
      message = 'Deseja enviar 1 tarefa para a sprint?'
    }

    const updatedTask = tasks
      .filter(task => tasksIds.includes(task.id!))
      .map(task => ({ id: task.id!, data: { kanbanColumn: 'to-do' } }))

    openModal(<ConfirmationModal
      label={message}
      handleConfirmation={() => {
        updateManyTasks(updatedTask).then(() => { fetchTasks() })
        console.log(updatedTask)
      }}
    />)
  }

  const handleDeleteMany = (tasksIds: GridRowSelectionModel) => {
    let message = ''
    if (tasksIds.length > 1) {
      message = `Deseja remover ${tasksIds.length} tarefas?`
    } else {
      message = 'Deseja remover 1 tarefa'
    }

    openModal(<ConfirmationModal
      label={message}
      handleConfirmation={() => {
        deleteTasksByIds(tasksIds).then(() => { fetchTasks() })
      }}
    />)
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const matchesSearch = ['title', 'assignedTo'].some(key =>
        String(task[key as keyof Task]).toLowerCase().includes(search.toLowerCase())
      );
      const isInBacklogColumn = task.kanbanColumn === 'backlog';

      return matchesSearch && isInBacklogColumn;
    });
  }, [tasks, search]);


  return (
    <Box>
      <TaskList
        tasks={filteredTasks}
        onEdit={handleOpenTaskModal}
        handleSendToSprint={handleSendToSprint}
        handleSendManyToSprint={handleSendManyToSprint}
        handleDeleteMany={handleDeleteMany}
      />
    </Box>
  );
};

export default Backlog;