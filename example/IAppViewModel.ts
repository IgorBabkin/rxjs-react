import {Observable} from 'rxjs';
import {IOfferViewModel} from './IOfferViewModel';

export interface IAppViewModel {
    time: Observable<number>;

    offers: Observable<IOfferViewModel[]>;
}
