import { ViewMetadata } from './ViewMetadata';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnPackedProperties } from './core.interface';

export class ViewModelObservablesAdapter<T> {
    public fields$: Observable<UnPackedProperties<T, Observable<any>>>;

    constructor(model: T, metadata: ViewMetadata<T>) {
        const observableFields = metadata.observableFields;
        const fields = metadata.observableFields;
        const observables = fields
            .map((key: string) => {
                return model[key] as Observable<any>;
            });

        this.fields$ = combineLatest(...observables).pipe(
            map((values) => {
                return observableFields.reduce((acc, value, index) => {
                    acc[value] = values[index];
                    return acc;
                }, {}) as UnPackedProperties<T, Observable<any>>;
            }),
        );
    }
}
