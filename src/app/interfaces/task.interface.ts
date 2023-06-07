export interface Task {
    id: string;
    title: string;
    description: string;
    priority: TaskPriorityEnum;
    duration?: string;
    timeUsed: number;
    status: TaskStatusEnum;
}

export enum TaskPriorityEnum {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export enum TaskStatusEnum {
    Pending = 'Pending',
    Progress= 'Progress',
    Finished = 'Finished'
}
