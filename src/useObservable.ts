import {Observable} from 'rxjs';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {EntityProvider, entityProvider} from './entityProvider';
import {ObservableAdapter} from './ObservableAdapter';

type GetValue = <O>(value: Observable<O>) => O;
type ObservableMap = Map<Observable<any>, ObservableAdapter<any>>;
type ObservableProvider = EntityProvider<Observable<any>[]>;

const useForceUpdate = () => {
    const [, updateState] = useState();
    return useCallback(() => updateState({}), []);
};

const useAutoUnsubscribe = (observables: ObservableMap) => {
    const newObs = useMemo<ObservableProvider>(() => entityProvider([]), []);
    useEffect(() => {
        const toUnsubscribe = Array.from(observables.keys()).filter((k) => !newObs.get().includes(k));
        toUnsubscribe.forEach((u) => observables.get(u).unsubscribe());
        newObs.set([]);
    });
    return newObs;
};

const useGetAdapter = (observables: ObservableMap) => {
    return useCallback((obs$: Observable<any>) => {
        if (!observables.has(obs$)) {
            const adapter = new ObservableAdapter(obs$);
            observables.set(obs$, adapter);
        }
        return observables.get(obs$);
    }, [observables]);
};

export const useObservableValue = (): GetValue => {
    const observables = useMemo<ObservableMap>(() => new Map(), []);
    const getAdapter = useGetAdapter(observables);
    const forceUpdate = useForceUpdate();

    const autoUnsubscribeObs$ = useAutoUnsubscribe(observables);
    useEffect(() => () => Array.from(observables.values()).forEach(s => s.unsubscribe()), [observables]);

    return useMemo(() => <T>(obs$: Observable<T>) => {
        autoUnsubscribeObs$.get().push(obs$);
        const adapter = getAdapter(obs$);
        if (!adapter.isSubscribed) {
            adapter.subscribe(forceUpdate);
        }
        return adapter.current;
    }, [observables]);
};
