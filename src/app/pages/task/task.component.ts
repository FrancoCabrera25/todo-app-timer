import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from '../../core/service/task.service';
import { Task } from 'src/app/interfaces/task.interface';
import { Subject, takeUntil } from 'rxjs';
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    public taskList: Task[] = [];
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
        this.dialog.open(TaskFormComponent, {
            width: '450px',
        });
    }
    public updateTimeUsed(time: number, task: Task): void {
        console.log("time",);
        const updateTask: Task = {
            ...task,
            timeUsed: task.timeUsed + time,
        };
        this.taskService.updateTask(updateTask);
    }

    public updateStatus(task: Task): void {
        
    }
    
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
