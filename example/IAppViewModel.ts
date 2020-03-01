import {Observable} from 'rxjs';

export interface IAppViewModel {
    canShowTime: Observable<boolean>;
    time: Observable<number>;

    toggle(): void;
}
