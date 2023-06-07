import { Component, Inject, OnInit } from '@angular/core';
import { TaskPriorityEnum, Task } from '../../../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/service/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
    public taskPriority!: string[];
    public title: string = 'New Task';
    public form!: FormGroup;
    public buttonPrincipalText: string = 'Save';
    public buttonSecondaryText: string = 'Cancel';

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        public dialogRef: MatDialogRef<TaskFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Task
    ) {}
    public ngOnInit(): void {
        this.initForm();
        this.taskPriority = Object.keys(TaskPriorityEnum);
        this.buttonPrincipalText = this.data ? 'Edit' : 'Save';
    }

    private initForm(): void {
        let title = '',
            description = '',
            priority = '';
        if (this.data) {
            title = this.data.title;
            description = this.data.description;
            priority = this.data.priority;
        }

        this.form = this.fb.group({
            title: [title, Validators.required],
            description: [description, Validators.required],
            priority: [priority, Validators.required],
        });
    }
    public onSubmit(): void {
        if (!this.data) {
            this.taskService.add({
                ...this.form.value,
            });
        } else {
            this.taskService.update({
                ...this.data,
                ...this.form.value,
                id: this.data.id,
            });
        }

        this.close();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
