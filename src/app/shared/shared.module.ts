import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TimerComponent } from './components/timer/timer.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewEmptyComponent } from './components/view-empty/view-empty.component';
@NgModule({
    declarations: [TimerComponent, SearchComponent,ViewEmptyComponent, FilterPipe],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        AngularMaterialModule,
        TimerComponent,
        SearchComponent,
        ViewEmptyComponent,
        FilterPipe,
    ],
})
export class SharedModule {}
