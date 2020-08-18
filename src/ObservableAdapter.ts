import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

export class ObservableAdapter<T> {
    public current: T;
    private obs$: Observable<T>;
    private subscriptions: Subscription[];
    public isSubscribed: boolean;

    constructor(obs$: Observable<T>) {
        this.obs$ = obs$;
    }

    public subscribe(onNext: (v: T) => void): void {
        if (this.isSubscribed) {
            return;
        }
        this.subscriptions = [
            this.obs$.pipe(distinctUntilChanged()).subscribe((v) => {
                this.current = v;
                if (this.isSubscribed) {
                    onNext(v);
                }
            }),
        ];
        this.isSubscribed = true;
    }

    public unsubscribe(): void {
        this.subscriptions.forEach(u => u.unsubscribe());
        this.isSubscribed = false;
    }
}
