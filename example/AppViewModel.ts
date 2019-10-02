import {observable} from '../src';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {IAppViewModel} from './IAppViewModel';
import {IOfferViewModel} from './IOfferViewModel';

export class AppViewModel implements IAppViewModel {
    @observable public offers = new BehaviorSubject<IOfferViewModel[]>([
        {
            id: '1',
        },
        {
            id: '2',
        },
        {
            id: '3',
        },
    ]);

    @observable
    public get time(): Observable<number> {
        return timer(0, 3000).pipe(
            map(() => Date.now()),
        );
    }
}
