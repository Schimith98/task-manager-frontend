import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from './config';
import { Task } from '../contexts/TaskContext';
import { toast } from 'react-toastify';
import { GridRowSelectionModel } from '@mui/x-data-grid';

const tasksCollection = collection(db, 'tasks');

export const addTask = async (task: Task) => {
  try {
    const docRef = await addDoc(tasksCollection, {
      ...task,
      createdTime: new Date().toISOString(),
    });
    toast.success('Tarefa criada com sucesso!');
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    toast.error('Erro ao criar tarefa!');
    console.error('Error adding document: ', e);
  }
};

export const getTasks:  () => Promise<Task[] | undefined> = async () => {
  try {
    const querySnapshot = await getDocs(tasksCollection);
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() } as Task);
    });
    return tasks;
  } catch (e) {
    console.error('Error getting documents: ', e);
    toast.error('Erro ao acessar o banco de dados!');
  }
};

export const updateTask = async (id: string, updatedTask: Partial<Task>) => {
  try {
    const taskDoc = doc(db, 'tasks', id);
    await updateDoc(taskDoc, updatedTask);
    console.log('Document updated with ID: ', id);
    toast.success('Tarefa atualizada com sucesso!', {toastId: id});
  } catch (e) {
    console.error('Error updating document: ', e);
    toast.error('Erro ao editar a tarefa!');
  }
};

export const updateManyTasks = async (tasksToUpdate: { id: string, data: Partial<Task> }[]) => {
  const batch = writeBatch(db);

  try {
    tasksToUpdate.forEach(({ id, data }) => {
      const taskDoc = doc(db, 'tasks', id);
      batch.update(taskDoc, data);
    });

    await batch.commit();

    console.log('Documents updated successfully');
    toast.success('Tarefas atualizadas com sucesso!', {toastId: 'updateMany'});
  } catch (e) {
    console.error('Error updating documents: ', e);
    toast.error('Erro ao editar as tarefas!');
  }
};

export const deleteTask = async (id: string) => {
  try {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
    console.log('Document deleted with ID: ', id);
    toast.success('Tarefa removida com sucesso!', {toastId: id});
  } catch (e) {
    console.error('Error deleting document: ', e);
    toast.error('Erro ao remover a tarefa!');
  }
};

export const addMultipleTasks = async (tasks: Task[]) => {
  const batch = writeBatch(db);
  tasks.forEach((task) => {
    const docRef = doc(tasksCollection);
    batch.set(docRef, {
      ...task,
      createdTime: new Date().toISOString(),
    });
  });
  
  try {
    await batch.commit();
    toast.success('Tarefas criadas com sucesso!');
  } catch (e) {
    toast.error('Erro ao criar tarefas!');
  }
};

export const deleteAllTasks = async () => {
  const batch = writeBatch(db);
  const tasksCollection = collection(db, "tasks"); 
  const tasksSnapshot = await getDocs(tasksCollection);

  tasksSnapshot.forEach((taskDoc) => {
    batch.delete(doc(tasksCollection, taskDoc.id));
  });

  try {
    await batch.commit();
    toast.success("Todas as tarefas foram deletadas com sucesso!");
  } catch (e) {
    toast.error("Erro ao deletar as tarefas!");
  }
};

export const deleteTasksByIds = async (taskIds: string [] | GridRowSelectionModel) => {
  if (!Array.isArray(taskIds) || taskIds.length === 0) {
    toast.error("Nenhum ID de tarefa fornecido!");
    return;
  }

  const batch = writeBatch(db);
  const tasksCollection = collection(db, "tasks");

  taskIds.forEach((taskId) => {
    batch.delete(doc(tasksCollection, taskId));
  });

  try {
    await batch.commit();
    toast.success("Tarefas selecionadas foram deletadas com sucesso!");
  } catch (e) {
    toast.error("Erro ao deletar as tarefas!");
  }
};