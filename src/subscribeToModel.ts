import { UnObservable, Unsubscribe } from './core.interface';
import { ViewModelAdapter } from './ViewModelAdapter';

export const subscribeToModel = <T>(model: T, fn: (values: UnObservable<T>) => void): Unsubscribe => {
    const viewModelAdapter = new ViewModelAdapter(model);
    const subscription = viewModelAdapter.fields$.subscribe(fn);
    return () => subscription.unsubscribe();
};
