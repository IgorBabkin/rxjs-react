import { UnObservable } from './core.interface';
import { ViewMetadata } from './ViewMetadata';
import { ViewModelActionsAdapter } from './ViewModelActionsAdapter';
import { ViewModelObservablesAdapter } from './ViewModelObservablesAdapter';
import { ViewModelPropertiesAdapter } from './ViewModelPropertiesAdapter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ViewModelAdapter<T> {
    public fields$: Observable<UnObservable<T>>;

    constructor(model: T) {
        const metadataProvider = new ViewMetadata(model);
        const viewModelObservablesAdapter = new ViewModelObservablesAdapter(model, metadataProvider);
        const viewModelPropertiesAdapter = new ViewModelPropertiesAdapter(model, metadataProvider);
        const viewModelActionsAdapter = new ViewModelActionsAdapter(model, metadataProvider);
        this.fields$ = viewModelObservablesAdapter.fields$.pipe(
            map((observables) => {
                return {
                    ...observables,
                    ...viewModelPropertiesAdapter.props,
                    ...viewModelActionsAdapter.actions,
                } as UnObservable<T>;
            }),
        );
    }
}
