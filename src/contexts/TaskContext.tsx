import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getTasks } from '../firebase/tasksCRUD';
import { useUser } from './UserContext';

export interface Task {
  id?: string;
  priority: string;
  title: string;
  description: string;
  kanbanColumn: string;
  assignedTo: string
  bgcolor: string;
  estimatedTime: string;
  spentTime: string;
  createdTime?: string;
}

interface TaskContextType {
  display: number
  setDisplay: React.Dispatch<React.SetStateAction<number>>;
  selectedTask: Task | null
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  tasks: Task[];
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {setLoading} = useUser()
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [display, setDisplay] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const fetchTasks = async () => {
    const tasks = await getTasks()
    setTasks(tasks ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <TaskContext.Provider value={{
      display,
      setDisplay,
      selectedTask,
      setSelectedTask,
      tasks,
      search,
      setSearch,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTasks };
