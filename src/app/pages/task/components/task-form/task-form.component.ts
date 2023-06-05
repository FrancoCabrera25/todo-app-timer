import { Component, OnInit } from '@angular/core';
import { TaskPriorityEnum } from '../../../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/service/task.service';
import { MatDialogRef } from '@angular/material/dialog';
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

    constructor(private fb: FormBuilder, private taskService: TaskService,
        public dialogRef: MatDialogRef<TaskFormComponent>) {}
    public ngOnInit(): void {
        this.initForm();
        this.taskPriority = Object.keys(TaskPriorityEnum);
    }

    private initForm(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            priority: ['', Validators.required],
        });
    }
    public onSubmit(): void {
        console.log('form', this.form.value);
        this.taskService.addTask({
            ...this.form.value,
        });
      this.close();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
