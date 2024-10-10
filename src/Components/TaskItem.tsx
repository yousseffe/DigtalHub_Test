import React from 'react';
import { Task, TaskStatus } from '../types/Task';

interface TaskItemProps {
    task: Task;
    changeStatus: (id: number) => void;
    editTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

export const TaskItem = ({ task, changeStatus, editTask, deleteTask }: TaskItemProps) => {
    return (
        <div
            key={task.id}
            className={`border p-4 rounded ${getStatusColor(task.status)} flex justify-between flex-wrap`}
        >
            <div>
                <p className="text-lg font-semibold">{task.description}</p>
                <p  >{task.status}</p>
            </div>
            <div className="flex items-center md:my-0 mt-2">
                <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => changeStatus(task.id)}
                >
                    Change Status
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => editTask(task.id)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )

};

const getStatusColor = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.NotStarted:
            return 'bg-yellow-300';
        case TaskStatus.InProgress:
            return 'bg-blue-300';
        case TaskStatus.Finished:
            return 'bg-green-300';
        default:
            return 'bg-white';
    }
};
