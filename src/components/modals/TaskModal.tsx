import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Stack, Box, RadioGroup, Radio } from '@mui/material';
import { Task, useTasks } from '../../contexts/TaskContext';
import { useModal } from '../../contexts/ModalContext';
import ConfirmationModal from './ConfirmationModal';
import { kanbanColumns } from '../../constants/kabancolumns';
import { quadrants } from '../../constants/quadrants';
import { addTask, deleteTask, updateTask } from '../../firebase/tasksCRUD';
import { useUser } from '../../contexts/UserContext';
import { cardColors } from '../../constants/cardColors';

const formDefaultValues: Task = {
  title: '',
  priority: 'quadrant-1',
  description: '',
  kanbanColumn: 'backlog',
  assignedTo: '',
  bgcolor: cardColors[0],
  estimatedTime: '',
  spentTime: ''
}

const TaskModal: React.FC = () => {
  const { setLoading } = useUser()
  const { selectedTask, setSelectedTask, fetchTasks } = useTasks();
  const { closeModal, openModal } = useModal();

  const { control, handleSubmit, reset, formState: { errors }, watch } = useForm({
    defaultValues: selectedTask || formDefaultValues,
  });

  const onSubmit = (data: Task) => {
    setLoading(true)
    if (data.id) {
      updateTask(data.id, data).then(() => { fetchTasks() });
    } else {
      addTask(data).then(() => { fetchTasks() });
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedTask(null);
    closeModal();
  };

  const handleDelete = () => {
    openModal(<ConfirmationModal
      label="Você tem certeza que deseja excluir esta tarefa?"
      handleConfirmation={() => {
        setLoading(true)
        deleteTask(selectedTask!.id!).then(() => { fetchTasks() });;
        closeModal();
      }}
    />)
  }

  useEffect(() => {
    reset(selectedTask ?? formDefaultValues);
  }, [selectedTask]);

  return (
    <Dialog open={true} onClose={handleClose} >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {selectedTask ? 'Editar Tarefa' : 'Criar Tarefa'}
        <Controller
          name="bgcolor"
          control={control}
          defaultValue=""
          rules={{ required: 'Color is required.' }}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {cardColors.map((el) => (
                <Radio key={`color-${el}`} value={el} sx={{
                  color: el,
                  '&.Mui-checked': {
                    color: el,
                  },
                }} />
              ))}
            </RadioGroup>
          )}
        />
      </DialogTitle>
      <DialogContent>
        <Stack direction={'column'} spacing={2} my={2}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'O título é obrigatório.' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Título da Tarefa"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ''}
              />
            )}
          />
          <Controller
            name="assignedTo"
            control={control}
            rules={{ required: 'O responsável é obrigatória.' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Responsável"
                fullWidth
                margin="normal"
                error={!!errors.assignedTo}
                helperText={errors.assignedTo ? errors.assignedTo.message : ''}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            rules={{ required: 'A prioridade é obrigatória.' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Prioridade"
                select
                fullWidth
                margin="normal"
                error={!!errors.priority}
                helperText={errors.priority ? errors.priority.message : ''}
              >
                {quadrants.map(el => <MenuItem key={el.taskPriority} value={el.taskPriority}>{el.title}</MenuItem>)}
              </TextField>
            )}
          />
          <Controller
            name="kanbanColumn"
            control={control}
            rules={{ required: 'A coluna do Kanban é obrigatória.' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Coluna Kanban"
                select
                fullWidth
                margin="normal"
                error={!!errors.kanbanColumn}
                helperText={errors.kanbanColumn ? errors.kanbanColumn.message : ''}
              >
                {kanbanColumns.map(el => <MenuItem key={el.columnId} value={el.columnId}>{el.title}</MenuItem>)}
              </TextField>
            )}
          />
          <Stack direction={'row'} spacing={2}>
            <Controller
              name="estimatedTime"
              control={control}
              rules={{
                pattern: {
                  value: /^(\d{1,4}h ?)?(\d{1,4}m)?$/,
                  message: "Por favor insira um formato válido (00h 00m)"
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tempo estimado"
                  margin="normal"
                  fullWidth
                  error={!!errors.estimatedTime}
                  helperText={errors.estimatedTime ? errors.estimatedTime.message : ""}
                />
              )}
            />

            <Controller
              name="spentTime"
              control={control}
              rules={{
                pattern: {
                  value: /^(\d{1,4}h ?)?(\d{1,4}m)?$/,
                  message: "Por favor insira um formato válido (00h 00m)"
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tempo gasto"
                  margin="normal"
                  fullWidth
                  error={!!errors.spentTime}
                  helperText={errors.spentTime ? errors.spentTime.message : ""}
                />
              )}
            />
          </Stack>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                label="Descrição"
                fullWidth
                margin="normal"
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
                minRows={3}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
          {!!selectedTask ? <Button onClick={handleDelete} color="error">Excluir</Button> : <Box />}
          <Box>
            <Button onClick={handleClose} color="secondary">Cancelar</Button>
            <Button onClick={handleSubmit(onSubmit)} color="primary">Salvar</Button>
          </Box>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
