import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskStatusEnum } from '../../interfaces/task.interface';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly ITEM_KEY_TASK_LOCAL_STORAGE = 'task';
    private currentTasksSubject = new BehaviorSubject<Task[]>([]);
    public currentTasks$ = this.currentTasksSubject.asObservable();
    constructor() {
        this.load();
    }

    public add(task: Task): void {
        task.id = uuid.v4();
        task.timeUsed = 0;
        task.status = TaskStatusEnum.Pending;
        const current = [...this.currentTasksSubject.getValue(), task];
        this.save(current);
    }

    public save(task: Task[]): void {
        this.setTaskLocalStorage(task);
        this.currentTasksSubject.next(task);
    }

    public update(task: Task): void {
        const tasksList = this.currentTasksSubject.getValue().map((oldTask) => {
            if (oldTask.id === task.id) {
                return {
                    ...oldTask,
                    ...task,
                };
            }
            return oldTask;
        });

        this.currentTasksSubject.next(tasksList);
        this.setTaskLocalStorage(tasksList);
    }

    public delete(id: string): void {
        const taskList = this.currentTasksSubject
            .getValue()
            .filter((task) => task.id !== id);

        this.save(taskList);
    }
    private load(): void {
        this.currentTasksSubject.next(this.getTaskLocalStorage());
    }

    private getTaskLocalStorage(): Task[] {
        return localStorage.getItem(this.ITEM_KEY_TASK_LOCAL_STORAGE)
            ? JSON.parse(
                  localStorage.getItem(this.ITEM_KEY_TASK_LOCAL_STORAGE)!
              )
            : [];
    }

    private setTaskLocalStorage(recipe: Task[]): void {
        localStorage.setItem(
            this.ITEM_KEY_TASK_LOCAL_STORAGE,
            JSON.stringify(recipe)
        );
    }
}
