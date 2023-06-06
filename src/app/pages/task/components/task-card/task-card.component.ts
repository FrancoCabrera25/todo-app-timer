import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task.interface';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
    @Input() task: Task;
    @Output() stopTimerEvent = new EventEmitter<number>();
    @Output() startTimerEvent = new EventEmitter<void>();
    ngOnInit(): void {}

    stopTimer(time: number): void {
        this.stopTimerEvent.emit(time);
    }

    startTimer(): void {
        this.startTimerEvent.emit();
    }
}
