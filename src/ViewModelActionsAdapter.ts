import { ViewMetadata } from './ViewMetadata';
import { IDictionary } from './core.interface';

export class ViewModelActionsAdapter<T> {
    public actions: IDictionary<any>;

    constructor(model: T, metadata: ViewMetadata<T>) {
        const fields = metadata.actionFields;
        this.actions = fields.reduce((acc, value) => {
            acc[value] = model[value].bind(model);
            return acc;
        }, {});
    }
}
