import {Observable} from 'rxjs';

export interface IAppViewModel {
    lastName: Observable<string>;
    firstName: Observable<string>;
    canShowTime: Observable<boolean>;
    time: Observable<number>;
    lala: Observable<number>;

    toggle(): void;

    changeFirstName(value: string): void;

    changeLastName(value: string): void;
}
