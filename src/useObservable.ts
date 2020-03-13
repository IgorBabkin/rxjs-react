import {Observable, Subscription} from 'rxjs';
import {useEffect, useMemo, useState} from 'react';
import {entityProvider} from "./entityProvider";

type GetValue = <O>(value: Observable<O>) => O;
type Provider<T> = { values: T };

export const useObservableValue = (): GetValue => {
    const isInitialized = useMemo(() => entityProvider(false), []);
    const newObs: Provider<Array<Observable<any>>> = useMemo(() => ({values: []}), []);
    const subscriptions = useMemo(() => new Map<any, Subscription>(), []);
    const unsubscribe = useMemo(
        () => () => Array.from(subscriptions.values()).forEach(s => s.unsubscribe()),
        [subscriptions],
    );
    const [[values], setValue] = useState([new Map()]);
    useEffect(() => unsubscribe, []);
    useEffect(() => {
        const toUnsubscribe = Array.from(subscriptions.keys()).filter((k) => !newObs.values.includes(k));
        toUnsubscribe.forEach((u) => {
            subscriptions.get(u).unsubscribe();
            subscriptions.delete(u);
        });
        newObs.values = [];
    });
    return useMemo(() => <T>(obs$: Observable<T>) => {
        if (!subscriptions.has(obs$)) {
            subscriptions.set(obs$, obs$.subscribe((v) => {
                values.set(obs$, v);
                if (isInitialized.get()) {
                    setValue([values]);
                }
            }));
        }

        isInitialized.set(true);
        newObs.values.push(obs$);

        return values.get(obs$);
    }, []);
};
