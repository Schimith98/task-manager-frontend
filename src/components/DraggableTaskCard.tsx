import { useDrag } from "react-dnd";
import { Task } from "../contexts/TaskContext";
import TaskCard from "./TaskCard";
import { ItemType } from "../constants/dndType";


interface DraggableTaskCardProps {
    task: Task;
    handleOpenModal: (task: Task | null) => void;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ task, handleOpenModal }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.TASK,
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <TaskCard key={task.id} task={task} handleOpenModal={handleOpenModal} />
        </div>
    );
};

export default DraggableTaskCard;