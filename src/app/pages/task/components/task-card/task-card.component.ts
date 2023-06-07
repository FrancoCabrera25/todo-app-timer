import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TaskStatusEnum } from '../../../../interfaces/task.interface';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {

    public isTimerRunning: boolean= false;
    @Input() task: Task;
    @Output() stopTimerEvent = new EventEmitter<number>();
    @Output() startTimerEvent = new EventEmitter<void>();
    @Output() deleteEvent = new EventEmitter<Task>();
    @Output() updateEvent = new EventEmitter<Task>();
    @Output() finishEvent = new EventEmitter<Task>();

    public taskStatusEnum = TaskStatusEnum;

    ngOnInit(): void {}

    stopTimer(time: number): void {
        this.stopTimerEvent.emit(time);
    }
    startTimer(): void {
        this.startTimerEvent.emit();
    }
    onDelete(): void {
        this.deleteEvent.emit(this.task);
    }
    onUpdate(): void {
        this.updateEvent.emit(this.task);
    }
    onStatusFinish(): void {
        this.finishEvent.emit(this.task);
    }

    handleChangeTimer(): void{

    }
}
