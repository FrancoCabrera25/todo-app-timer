import {
    Subscription,
    interval,
    takeWhile,
    Subject,
    takeUntil,
    timer,
} from 'rxjs';

import {
    OnInit,
    OnDestroy,
    Component,
    ViewChild,
    ElementRef,
    Output,
    Input,
    EventEmitter,
    Renderer2,
    ChangeDetectorRef,
} from '@angular/core';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
    @ViewChild('loaderSvg', { static: false }) loaderSvg: ElementRef;
    private destroy$ = new Subject<void>();
    private intervalSubscription: Subscription;
    public timeUsed: number = 0;
    public isRunning: boolean = false;
    public countdown = 30;
    public count = 0;
    public interval = 1 * 1000;
    @Input() duration: number = 0;
    @Output() stopEvent = new EventEmitter<number>();
    @Output() startEvent = new EventEmitter<void>();
    constructor(private changeDetector: ChangeDetectorRef) {}
    ngOnInit(): void {
        this.duration = this.duration * 60;
    }

    public start(): void {
        console.log("start");
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.count = 0;
        this.intervalSubscription = interval(this.interval)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.drawerTimer();
                this.count++;
                this.timeUsed = this.count / 60;
                this.countdown = this.duration - Math.floor(this.count / 60);
                if (this.count > this.duration) {
                    this.stop();
                }
            });
        this.startEvent.emit();
    }

    private drawerTimer(): void {
        const loader = this.loaderSvg.nativeElement.querySelector('#loader');
        const border = this.loaderSvg.nativeElement.querySelector('#border');

        const π = Math.PI;
        const α = (this.count / this.duration) * 360;
        const r = (α * π) / 180;
        const x = Math.sin(r) * 125;
        const y = Math.cos(r) * -125;
        const mid = α > 180 ? 1 : 0;
        const anim =
            'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

        loader.setAttribute('d', anim);
        border.setAttribute('d', anim);
    }
    public stop(): void {
        if (!this.isRunning) {
            return;
        }
        this.isRunning = false;
        this.stopEvent.emit(this.timeUsed);
             if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
          } 
    }
    ngOnDestroy(): void {
   
        this.destroy$.next();
        this.destroy$.complete();
    }
}
