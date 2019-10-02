import React, {FunctionComponent, useEffect, useState} from 'react';
import {IView, UnObservable} from './core.interface';
import {subscribeToModel} from './subscribeToModel';

export const observer = <T>(WrappedComponent: FunctionComponent<{ model: UnObservable<T> }>): IView<T> => {
    return (props) => {
        const [modelValues, setModelValues] = useState<UnObservable<T>>({} as UnObservable<T>);
        const [isReady, setReady] = useState<boolean>(false);

        useEffect(() => {
            const subscriptions = [subscribeToModel(props.model, (state) => setModelValues(state))];
            setReady(true);
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
