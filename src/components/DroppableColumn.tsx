import { useDrop } from "react-dnd";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { kanbanColumns } from "../constants/kabancolumns";
import { ItemType } from "../pages/PriorizationMatrix";

interface DroppableColumnProps {
    col: typeof kanbanColumns[0];
    children: React.ReactNode;
    onDrop: (taskId: string, newColumnId: string) => void;
    handleOpenInfoModal: (title: string, description: string[]) => void
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ col, children, onDrop, handleOpenInfoModal }) => {
    const [, drop] = useDrop({
        accept: ItemType.TASK,
        drop: (item: { id: string }) => onDrop(item.id, col.columnId),
    });

    return (
        <Box ref={drop} bgcolor={"#ffffff"} p={2} borderRadius={6}>
            <Stack direction={'column'} spacing={2} minWidth={'300px'}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h6" textAlign={'center'}>{col.title}</Typography>
                    <IconButton onClick={() => handleOpenInfoModal(col.title, col.description)}>
                        <HelpIcon color='info' />
                    </IconButton>
                </Stack>
                {children}
            </Stack>
        </Box>
    );
};

export default DroppableColumn;