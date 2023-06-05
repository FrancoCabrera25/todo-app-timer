import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly ITEM_KEY_TASK_LOCAL_STORAGE = 'task';
    private currentTasksSubject = new BehaviorSubject<Task[]>([]);
    public currentTasks$ = this.currentTasksSubject.asObservable();
    constructor() {
        this.loadTask();
    }

    public addTask(task: Task): void {
        task.id = uuid.v4();
        const current = [...this.currentTasksSubject.getValue(), task];
        this.setTaskLocalStorage(current);
        this.currentTasksSubject.next(current);
    }

    public updateTask(task: Task): void {
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

    private loadTask(): void {
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
