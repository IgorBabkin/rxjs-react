import {Observable} from 'rxjs';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {EntityProvider, entityProvider} from "./entityProvider";
import {ObservableAdapter} from "./ObservableAdapter";

type GetValue = <O>(value: Observable<O>) => O;

const useForceUpdate = () => {
    const [, updateState] = useState();
    return useCallback(() => updateState({}), []);
};

export const useObservableValue = (): GetValue => {
    const newObs: EntityProvider<Array<Observable<any>>> = useMemo(() => entityProvider([]), []);
    const observables = useMemo<Map<Observable<any>, ObservableAdapter<any>>>(() => new Map(), []);
    const forceUpdate = useForceUpdate();
    useEffect(() => () => Array.from(observables.values()).forEach(s => s.unsubscribe()), [observables]);
    useEffect(() => {
        const toUnsubscribe = Array.from(observables.keys()).filter((k) => !newObs.get().includes(k));
        toUnsubscribe.forEach((u) => {
            observables.get(u).unsubscribe();
            observables.delete(u);
        });
        newObs.set([]);
    });
    return useMemo(() => <T>(obs$: Observable<T>) => {
        newObs.get().push(obs$);
        if (!observables.has(obs$)) {
            const adapter = new ObservableAdapter(obs$);
            observables.set(obs$, adapter);
            adapter.subscribe(forceUpdate);
        }
        return observables.get(obs$).current;
    }, [observables]);
};
