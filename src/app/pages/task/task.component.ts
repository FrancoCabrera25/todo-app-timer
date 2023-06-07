import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from '../../core/service/task.service';
import { Task, TaskStatusEnum } from 'src/app/interfaces/task.interface';
import { Subject, takeUntil } from 'rxjs';
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    public taskList: Task[] = [];
    public filterValue: string = '';
    public taskStatusEnum = TaskStatusEnum;

    constructor(public dialog: MatDialog, private taskService: TaskService) {}

    ngOnInit(): void {
        this.getTaskList();
    }

    private getTaskList(): void {
        this.taskService.currentTasks$
            .pipe(takeUntil(this.destroy$))
            .subscribe((tasks: Task[]) => {
                this.taskList = tasks;
            });
    }

    public addTask(): void {
        this.showDialog();
    }
    public updateTimeUsed(time: number, task: Task): void {
        console.log('time', time);
        const updateTask: Task = {
            ...task,
            timeUsed: task.timeUsed + time,
        };
        this.taskService.update(updateTask);
    }

    public updateTask(task: Task): void {
        this.showDialog(task);
    }
    private showDialog(task?: Task): void {
        this.dialog.open(TaskFormComponent, {
            width: '450px',
            data: task ? task : null,
        });
    }

    public deleteTask(task: Task): void {
        this.taskService.delete(task.id);
    }
    public updateStatus(task: Task, status: TaskStatusEnum): void {
        this.taskService.update({
            ...task,
            status,
        });
    }

    public filter(value: string): void {
        this.filterValue = value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
