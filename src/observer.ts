import React, {Component, FunctionComponent, useEffect, useState} from 'react';
import {IView, UnObservable, Unsubscribe} from './core.interface';
import {subscribeToModel} from './subscribeToModel';

export const observer = <T>(WrappedComponent: FunctionComponent<{ model: UnObservable<T> }>): IView<T> =>
    class A extends Component<{model: T}, UnObservable<T>> {
        public state: UnObservable<T> = {} as UnObservable<T>;
        private subscriptions: Unsubscribe[] = [];

        public componentWillMount(): void {
            this.subscriptions.push(subscribeToModel(this.props.model, (state) => this.setState(state)));
        }

        public componentWillUnmount(): void {
            this.subscriptions.forEach((u) => u());
            this.subscriptions = [];
        }

        public render(): JSX.Element {
            return React.createElement(WrappedComponent, {
                ...this.props,
                model: this.state,
            });
        }
    };
