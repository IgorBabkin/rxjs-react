import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {IView, UnObservable} from './core.interface';
import {subscribeToModel} from './subscribeToModel';

const once = (fn: () => void) => {
    let flag = false;
    return () => {
        if (flag) {
            return;
        }

        fn();
        flag = true;
    };
};

export const observer = <T>(WrappedComponent: FunctionComponent<{ model: UnObservable<T> }>): IView<T> => {
    return (props) => {
        const [modelValues, setModelValues] = useState<UnObservable<T>>({} as UnObservable<T>);
        const [isReady, setReady] = useState<boolean>(false);

        useEffect(() => {
            const subscriptions = [subscribeToModel(props.model, (state) => {
                setModelValues(state);
                if (!isReady) {
                    setReady(true);
                }
            })];
            return () => subscriptions.forEach((u) => u());
        }, []);

        if (!isReady) {
            return null;
        }

        return React.createElement(WrappedComponent, {
            ...props,
            model: modelValues,
        });
    };
};
