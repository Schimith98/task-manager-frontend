import { Task } from "../contexts/TaskContext";

export const validateImportFile = (obj: any): obj is Task => {
    return (
        typeof obj.id === 'string' &&
        typeof obj.priority === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.description === 'string' &&
        typeof obj.kanbanColumn === 'string' &&
        typeof obj.assignedTo === 'string' &&
        typeof obj.spentTime === 'string' &&
        typeof obj.estimatedTime === 'string' &&
        typeof obj.bgcolor === 'string'
    );
};
