import React, { useMemo, useCallback } from 'react';
import { Box, Stack } from "@mui/material";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskModal from '../components/modals/TaskModal';
import InfoModal from '../components/modals/InfoModal';
import { Task, useTasks } from '../contexts/TaskContext';
import { useModal } from '../contexts/ModalContext';
import DroppableColumn from '../components/DroppableColumn';
import DraggableTaskCard from '../components/DraggableTaskCard';
import { kanbanColumns } from '../constants/kabancolumns';
import { updateTask } from '../firebase/tasksCRUD';
import { useUser } from '../contexts/UserContext';

const KanbanBoard: React.FC = () => {
  const {setLoading} = useUser()
  const { tasks, setSelectedTask, search, fetchTasks } = useTasks();
  const { openModal } = useModal();

  const handleOpenTaskModal = useCallback((task: Task | null = null) => {
    openModal(<TaskModal />);
    setSelectedTask(task);
  }, [openModal, setSelectedTask]);

  const handleOpenInfoModal = useCallback((title: string, description: string[]) => {
    openModal(<InfoModal title={title} description={description} />);
  }, [openModal]);

  const handleDrop = useCallback((taskId: string, newColumnId: string) => {
    const task = tasks.find(task => task.id === taskId);

    if (task && task?.kanbanColumn !== newColumnId) {
      setLoading(true)
      const updatedTask = { ...task, kanbanColumn: newColumnId }
      updateTask(taskId, updatedTask).then(() => fetchTasks());
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = ['title', 'assignedTo'].some(key =>
        String(task[key as keyof Task]).toLowerCase().includes(search.toLowerCase())
      );

      return matchesSearch;
    });
  }, [tasks, search]);

  const filteredKanbanColumns = kanbanColumns.filter(col => (col.columnId !== 'backlog' && col.columnId !== 'finish'))

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <Stack direction={'row'} spacing={2} overflow={'auto'} pb={2}>
          {filteredKanbanColumns.map((col) => (
            <DroppableColumn key={col.columnId} col={col} onDrop={handleDrop} handleOpenInfoModal={handleOpenInfoModal}>
              {filteredTasks
                .filter(task => (task.kanbanColumn === col.columnId))
                .map((task) => (
                  <DraggableTaskCard key={`kanbanCard-${task.id}`} task={task} handleOpenModal={handleOpenTaskModal} />
                ))}
            </DroppableColumn>
          ))}
        </Stack>
      </Box>
    </DndProvider>
  );
};

export default KanbanBoard;
