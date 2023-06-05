import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
    declarations: [],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule
    ],
})
export class AngularMaterialModule {}
