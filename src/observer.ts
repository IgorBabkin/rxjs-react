import React, { Component, ComponentClass, FunctionComponent } from 'react';
import { UnObservable } from './core.interface';
import { ViewModelAdapter } from './ViewModelAdapter';

export type IView<T> = ComponentClass<{ model: T }>;
type Unsubscribe = () => void;

export const observer = <T>(WrappedComponent: FunctionComponent<{ model: UnObservable<T> }>): IView<T> =>
    class A extends Component<{model: T}, UnObservable<T>> {
        public state: UnObservable<T> = {} as UnObservable<T>;
        private subscriptions: Unsubscribe[] = [];
        private viewModelAdapter: ViewModelAdapter<T>;

        constructor(props: {model: T}) {
            super(props);
            this.viewModelAdapter = new ViewModelAdapter(props.model);
        }

        public componentWillMount(): void {
            const subscription = this.viewModelAdapter.fields$.subscribe((state) => this.setState(state));
            this.subscriptions.push(() => subscription.unsubscribe());
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
