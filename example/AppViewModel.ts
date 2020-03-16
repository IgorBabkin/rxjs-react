import {BehaviorSubject, from, Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {IAppViewModel} from './IAppViewModel';

export class AppViewModel implements IAppViewModel {
    public time: Observable<number>;
    public firstName = new BehaviorSubject<string>('');
    public lastName = new BehaviorSubject<string>('');
    public myNumbers = from([1, 2, 3, 4]);
    public canShowTime = new BehaviorSubject(false);

    constructor() {
        this.time = timer(2000, 1000).pipe(
            map(() => Date.now()),
        );
    }

    public toggle(): void {
        this.canShowTime.next(!this.canShowTime.getValue());
    }

    changeFirstName(value: string): void {
        this.firstName.next(value);
    }

    changeLastName(value: string): void {
        this.lastName.next(value);
    }
}
