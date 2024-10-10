import React, { useState } from 'react';
import { Input } from '../Components/Input';
import { TaskStatus } from '../types/Task';

interface TaskFormProps {
    taskDescription: string;
    taskStatus: TaskStatus;
    editingTaskId: number | null;
    setTaskDescription: (description: string) => void;
    setTaskStatus: (status: TaskStatus) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const TaskForm = ({
    taskDescription,
    taskStatus,
    editingTaskId,
    setTaskDescription,
    setTaskStatus,
    onSubmit,
}: TaskFormProps) => {
    return (
        <form className="mb-4" onSubmit={onSubmit}>
            <label htmlFor="taskDescription" className=' font-semibold mb-2'>Task Description</label>
            <div className=" my-1 flex flex-wrap">
                <div className='flex-1'>
                    <Input
                        name="taskDescription"
                        value={taskDescription}
                        placeholder="Your username"
                        regex={/^[a-zA-Z0-9_]{3,}$/}
                        errorMessage="Username must be at least 3 characters."
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='me-2'
                    />
                </div>
                <div className='xs:flex xs:w-full xs:mt-2 sm:flex-none sm:w-auto sm:mt-0'>
                    <select
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
                        className=" bg-slate-200 border text-center ms-2 px-3 rounded sm:w-auto xs:w-full xs:mx-0 xs:py-2"
                    >
                        <option value={TaskStatus.NotStarted}>Not Started</option>
                        <option value={TaskStatus.InProgress}>In Progress</option>
                        <option value={TaskStatus.Finished}>Finished</option>
                    </select>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 xs:w-full xs:ms-2 rounded "
                        type="submit"
                    >
                        {editingTaskId ? 'Update Task' : 'Add Task'}
                    </button>
                </div>

            </div>
        </form>
    );
}