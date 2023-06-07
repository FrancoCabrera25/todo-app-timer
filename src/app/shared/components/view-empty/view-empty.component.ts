import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-view-empty',
    templateUrl: './view-empty.component.html',
    styleUrls: ['./view-empty.component.scss'],
})
export class ViewEmptyComponent implements OnInit {
    @Input() title: string = '';
    @Input() buttonTitle: string = "";
    @Input() showButton: boolean = false;
    @Output() onClickEvent = new EventEmitter<void>();
    
    ngOnInit(): void {
    }

    onClick(): void {
        this.onClickEvent.emit();
    }

}