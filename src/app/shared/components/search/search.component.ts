import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @Output() inputValueEvent = new EventEmitter<string>();
    public inputSearch: FormControl;
    ngOnInit(): void {
        this.inputSearch = new FormControl<string>('');
    }

    handleKeyup(event: any): void {
        this.inputValueEvent.emit(this.inputSearch.value);
    }
}
