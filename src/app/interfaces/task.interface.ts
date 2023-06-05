export interface Task {
    id: string;
    title: string;
    description: string;
    status?: string;
    priority: TaskPriorityEnum;
    duration?: string;
    timeUsed: number;
}

export enum TaskPriorityEnum {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}
