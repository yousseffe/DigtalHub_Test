import React from 'react';
import { Input } from '../Components/Input';
import { TaskStatus } from '../types/Task';

interface TaskFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filter: TaskStatus | 'All';
    setFilter: (filter: TaskStatus | 'All') => void;
}

export const TaskFilter = ({
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
}: TaskFilterProps) => {
    return (
        <div className="mb-4 flex justify-between">
            <Input
                name='searchTerm'
                placeholder='Search tasks'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" me-2 "
            />

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as TaskStatus | 'All')}
                className="p-2 rounded bg-slate-200"
            >
                <option value="All">All</option>
                <option value={TaskStatus.NotStarted}>{TaskStatus.NotStarted}</option>
                <option value={TaskStatus.InProgress}>{TaskStatus.InProgress}</option>
                <option value={TaskStatus.Finished}>{TaskStatus.Finished}</option>
            </select>
        </div>
    );
};
