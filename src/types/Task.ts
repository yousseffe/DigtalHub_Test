export interface Task {
    id: number;
    description: string;
    status: TaskStatus;
    user: string;
}

export enum TaskStatus {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Finished = 'Finished',
}
