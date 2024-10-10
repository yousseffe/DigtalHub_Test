import React, { useEffect, useState } from 'react';
import { Input } from '../Components/Input';
import { TaskForm } from '../Components/TaskForm';
import { TaskFilter } from '../Components/TaskFilter';
import { TaskList } from '../Components/TaskList';
import { Pagination } from '../Components/Pagination';

enum TaskStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Finished = 'Finished',
}

interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  user: string;
}

const tasksPerPage = 8;

export function Home():JSX.Element {

  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const username = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.NotStarted);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDescription.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      description: taskDescription,
      status: taskStatus,
      user: username
    };

    setTaskList((prevTasks) => [...prevTasks, newTask]);
    resetForm();
  };

  const editTask = (id: number) => {
    const taskToEdit = taskList.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskDescription(taskToEdit.description);
      setTaskStatus(taskToEdit.status);
      setEditingTaskId(id);
    }
  };

  const updateTask = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!taskDescription.trim() || editingTaskId === null) return;

    const updatedTaskList = taskList.map((task: Task): Task =>
      task.id === editingTaskId
        ? { ...task, description: taskDescription, status: taskStatus }
        : task
    );

    setTaskList(updatedTaskList);
    resetForm();
  };

  const deleteTask = (id: number) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };

  const resetForm = () => {
    setTaskDescription('');
    setTaskStatus(TaskStatus.NotStarted);
    setEditingTaskId(null);
  };

  const changeStatus = (id: number) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        const nextStatus =
          task.status === TaskStatus.NotStarted
            ? TaskStatus.InProgress
            : task.status === TaskStatus.InProgress
              ? TaskStatus.Finished
              : TaskStatus.NotStarted;
        return { ...task, status: nextStatus };
      }
      return task;
    });

    setTaskList(updatedTaskList);
  };

  const filteredTasks = taskList.filter((task) => {
    const matchesFilter = filter === 'All' || task.status === filter;
    const matchesSearchTerm = task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearchTerm;
  });

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  return (
    <div className=" h-screen p-6">
      <h1 className=" text-3xl mb-4 text-center mt-10">Task Manager</h1>
      <TaskForm
        taskDescription={taskDescription}
        taskStatus={taskStatus}
        editingTaskId={editingTaskId}
        setTaskDescription={setTaskDescription}
        setTaskStatus={setTaskStatus}
        onSubmit={editingTaskId ? updateTask : addTask}
      />
      <TaskFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

      <TaskList
        tasks={paginatedTasks}
        changeStatus={changeStatus}
        editTask={editTask}
        deleteTask={deleteTask}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </div>
  );
}


