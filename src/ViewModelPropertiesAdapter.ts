import { ViewMetadata } from './ViewMetadata';
import { IDictionary } from './core.interface';

export class ViewModelPropertiesAdapter<T> {
    private fields: string[];
    private model: T;

    constructor(model: T, metadata: ViewMetadata<T>) {
        this.model = model;
        this.fields = metadata.propertyFields;
    }

    public get props(): IDictionary<any> {
        return this.fields.reduce((acc, value) => {
            acc[value] = this.model[value];
            return acc;
        }, {});
    }
}
