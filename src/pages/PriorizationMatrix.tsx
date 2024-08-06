import React, { useMemo, useCallback } from 'react';
import { Grid } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task, useTasks } from '../contexts/TaskContext';
import { useModal } from '../contexts/ModalContext';
import TaskModal from '../components/modals/TaskModal';
import InfoModal from '../components/modals/InfoModal';
import { quadrants } from '../constants/quadrants';
import DroppableQuadrant from '../components/DroppableQuadrant';
import DraggableTaskCard from '../components/DraggableTaskCard';
import { updateTask } from '../firebase/tasksCRUD';
import { useUser } from '../contexts/UserContext';

export const ItemType = {
  TASK: 'task',
};

const PrioritizationMatrix: React.FC = () => {
  const { setLoading } = useUser();
  const { tasks, setSelectedTask, search, fetchTasks } = useTasks();
  const { openModal } = useModal();

  const handleOpenTaskModal = useCallback((task: Task | null = null) => {
    openModal(<TaskModal />);
    setSelectedTask(task);
  }, [openModal, setSelectedTask]);

  const handleOpenInfoModal = useCallback((title: string, description: string[]) => {
    openModal(<InfoModal title={title} description={description} />);
  }, [openModal]);

  const handleDrop = useCallback((taskId: string, newPriority: string) => {
    const task = tasks.find((task: Task) => task.id === taskId);
    if (task && task.priority !== newPriority) {
      setLoading(true)
      const updatedTask = { ...task, priority: newPriority }
      updateTask(taskId, updatedTask).then(() => fetchTasks());
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const matchesSearch = ['title', 'assignedTo'].some(key =>
        String(task[key as keyof Task]).toLowerCase().includes(search.toLowerCase())
      );
      const notInClosedColumn = task.kanbanColumn !== 'finish';

      return matchesSearch && notInClosedColumn;
    });
  }, [tasks, search]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={2}>
        {quadrants.map((quadrant) => (
          <Grid key={`quadrant-${quadrant.taskPriority}`} item xs={12} md={6}>
            <DroppableQuadrant quadrant={quadrant} onDrop={handleDrop} handleOpenInfoModal={handleOpenInfoModal}>
              {filteredTasks
                .filter(task => task.priority === quadrant.taskPriority)
                .map((task) => (
                  <DraggableTaskCard key={`matrix-${task.id}`} task={task} handleOpenModal={handleOpenTaskModal} />
                ))}
            </DroppableQuadrant>
          </Grid>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default PrioritizationMatrix;
