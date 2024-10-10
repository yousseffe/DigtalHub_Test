import React from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
    tasks: Task[];
    changeStatus: (id: number) => void;
    editTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

export const TaskList = ({
    tasks,
    changeStatus,
    editTask,
    deleteTask,
}: TaskListProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    changeStatus={changeStatus}
                    editTask={editTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    )

};
