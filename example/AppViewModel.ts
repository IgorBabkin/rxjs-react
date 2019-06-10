import { action, observable, property } from '../src';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppViewModel } from './IAppViewModel';

export class AppViewModel implements IAppViewModel {
    @observable public firstname = new BehaviorSubject('Igor');
    @observable public lastname = new BehaviorSubject('Babkin');
    @observable public years = new BehaviorSubject(31);
    @property public version: number = 1;

    @observable
    public get fullname(): Observable<string> {
        return combineLatest(this.firstname, this.lastname).pipe(
            map(([firstname, lastname]) => `${firstname} ${lastname}`),
        );
    }

    @action
    public changeFirstname(value: string): void {
        this.firstname.next(value);
    }

    @action
    public incrementSize(): void {
        this.years.next(this.years.getValue() + 1);
    }

    public s(): number {
        return 33;
    }

    @property
    public get size(): number {
        console.log('hey');
        return this.s();
    }
}
