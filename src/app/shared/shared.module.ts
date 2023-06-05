import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TimerComponent } from './components/timer/timer.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [TimerComponent],
    imports: [CommonModule, AngularMaterialModule],
    exports: [AngularMaterialModule, TimerComponent],
})
export class SharedModule {}