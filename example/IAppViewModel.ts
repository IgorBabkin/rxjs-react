import { Observable } from 'rxjs';

export interface IAppViewModel {
    firstname: Observable<string>;
    lastname: Observable<string>;
    fullname: Observable<string>;
    years: Observable<number>;
    version: number;
    size: number;
    changeFirstname(value: string): void;
    incrementSize(): void;
}
