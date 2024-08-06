import { Box, IconButton, Stack, Typography } from "@mui/material";
import { quadrants } from "../constants/quadrants";
import { useDrop } from "react-dnd";
import HelpIcon from '@mui/icons-material/Help';
import { ItemType } from "../constants/dndType";

interface DroppableQuadrantProps {
  quadrant: typeof quadrants[0];
  children: React.ReactNode;
  onDrop: (taskId: string, newPriority: string) => void;
  handleOpenInfoModal: (title: string, description: string[]) => void
}

const DroppableQuadrant: React.FC<DroppableQuadrantProps> = ({ quadrant, children, onDrop, handleOpenInfoModal }) => {
  const [, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item: { id: string }) => onDrop(item.id, quadrant.taskPriority),
  });

  return (
    <Box
      ref={drop}
      bgcolor={"#ffffff"}
      p={2}
      borderRadius={6}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="h6" textAlign={'center'} width={'100%'}>
          {quadrant.title}
        </Typography>
        <IconButton onClick={() => handleOpenInfoModal(quadrant.title, quadrant.description)}>
          <HelpIcon color='info' />
        </IconButton>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} useFlexGap gap={2}>
        {children}
      </Stack>
    </Box>
  );
};

export default DroppableQuadrant;