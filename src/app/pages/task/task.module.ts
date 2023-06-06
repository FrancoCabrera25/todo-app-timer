import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './components/task-card/task-card.component';
@NgModule({
    declarations: [TaskComponent, TaskFormComponent, TaskCardComponent],
    imports: [CommonModule,SharedModule, TaskRoutingModule, ReactiveFormsModule],
    exports: [TaskComponent],
})
export class TaskModule {}