import {BehaviorSubject, Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {IAppViewModel} from './IAppViewModel';

export class AppViewModel implements IAppViewModel {
    public time: Observable<number>;
    public canShowTime: BehaviorSubject<boolean>;

    constructor() {
        this.time = timer(0, 1000).pipe(
            map(() => Date.now()),
        );
        this.canShowTime = new BehaviorSubject(false);
    }

    public toggle(): void {
        this.canShowTime.next(!this.canShowTime.getValue());
    }
}
