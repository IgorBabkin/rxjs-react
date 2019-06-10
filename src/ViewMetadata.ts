import { observableType, propertyType, actionType } from './constants';

export class ViewMetadata<T> {
    private target: T;
    constructor(target: T) {
        this.target = target;
    }
    public get observableFields(): string[] {
        return Reflect.getMetadata(observableType, this.target) || [];
    }
    public get propertyFields(): string[] {
        return Reflect.getMetadata(propertyType, this.target) || [];
    }
    public get actionFields(): string[] {
        return Reflect.getMetadata(actionType, this.target) || [];
    }
    public hasFields(metaKey: symbol): boolean {
        return Reflect.hasMetadata(metaKey, this.target);
    }
    public createFields(metaKey: symbol): string[] {
        Reflect.defineMetadata(metaKey, [], this.target);
        return Reflect.getMetadata(metaKey, this.target);
    }
    public getFields(metaKey: symbol): string[] {
        return Reflect.getMetadata(metaKey, this.target);
    }
    public addToFields(metaKey: symbol, propertyKey: string): void {
        Reflect.defineMetadata(metaKey, [], this.target);
    }
}
