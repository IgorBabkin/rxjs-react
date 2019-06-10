import 'reflect-metadata';
import { ViewMetadata } from './ViewMetadata';
import { observableType, actionType, propertyType } from './constants';

function view(metaKey: symbol) {
    return (target: any, propertyKey: string, descriptor?: PropertyDescriptor): void => {
        const metadata = new ViewMetadata(target);
        const fields = metadata.hasFields(metaKey)
            ? metadata.getFields(metaKey)
            : metadata.createFields(metaKey);

        fields.push(propertyKey);
    };
}

export const observable = view(observableType);
export const action = view(actionType);
export const property = view(propertyType);

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export type IComparator<T> = (a: T) => (b: T) => boolean;

export const includes = <T>(included: T[], compareFn: IComparator<T>) => (value: T) => included.some(compareFn(value));
export const excludes = <T>(included: T[], compareFn: IComparator<T>) => (value: T) => !included.some(compareFn(value));
