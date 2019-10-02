import { observable, property, action } from './core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export class TestViewModel {
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
        return this.s();
    }
}
