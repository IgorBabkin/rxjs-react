import React, {FunctionComponent, useEffect, useState} from 'react';
import {IView, UnObservable} from './core.interface';
import {subscribeToModel} from './subscribeToModel';

export const observer = <T>(WrappedComponent: FunctionComponent<{ model: UnObservable<T> }>): IView<T> => {
    return (props) => {
        const [modelValues, setModelValues] = useState<UnObservable<T>>();

        useEffect(() => {
            const subscriptions = [subscribeToModel(props.model, (state) => setModelValues(state))];
            return () => subscriptions.forEach((u) => u());
        }, []);

        return React.createElement(WrappedComponent, {
            ...props,
            model: modelValues,
        });
    };
};
