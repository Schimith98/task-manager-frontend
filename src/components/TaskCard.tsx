import React from 'react';
import { Typography, Paper, Box, Tooltip } from '@mui/material';
import { Task } from '../contexts/TaskContext';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)<{ bgcolor: string }>(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    transition: 'transform 0.3s ease-in-out',
    cursor: "pointer",
    padding: "12px",
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

type Props = {
    task: Task
    handleOpenModal: (task: Task) => void
}

const TaskCard: React.FC<Props> = ({ task, handleOpenModal }) => {
    return (<StyledPaper
        bgcolor={task.bgcolor}
        elevation={3}
        key={task.id}
        onClick={() => handleOpenModal(task)} >
        <Typography fontSize={'16px'}>{task.title}</Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'baseline'}>
            <Typography fontSize={'13px'}> {task.assignedTo}</Typography>
            <Tooltip title={'Tempo estimado / Tempo gasto'}>
                <Typography fontSize={'11px'}>{task.estimatedTime.length > 0 ? task.estimatedTime : '-'} / {task.spentTime.length > 0 ? task.spentTime : '-' }</Typography>
            </Tooltip>
        </Box>
    </StyledPaper>);
};

export default TaskCard;
