import { OperatorFunction, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

type Options<TInput, TOutput> = {
    idFn: (item: TInput) => any;
    create: (data: TInput) => TOutput;
    update: (data: TInput, model: TOutput) => void;
    remove: (model: TOutput) => void;
};

export const transformArray = <TInput, TOutput>(props: Options<TInput, TOutput>): OperatorFunction<TInput[], TOutput[]> => {
    const {create, update, remove, idFn} = props;
    return (source) => {
        return Observable.create((subscriber: Observer<any>) => {
            const models = new Map<TInput, TOutput>();
            const subscription = source.pipe(
                map((b) => {
                    const a = Array.from(models.keys());
                    const newItems = b.filter((item) => !a.some((v) => v === idFn(item)));
                    const removedIds = a.filter(v => !b.some(item => v === idFn(item)));
                    const updatedItems = b.filter(item => a.some(v => v === idFn(item)));
                    removedIds.forEach((item) => {
                        remove(models.get(item));
                        models.delete(item);
                    });
                    newItems.forEach((item) => {
                        const id = idFn(item);
                        models.set(id, create(item));
                    });
                    updatedItems.forEach((item) => {
                        const id = idFn(item);
                        update(item, models.get(id));
                    });
                    return b.map((item) => {
                        const id = idFn(item);
                        const m = models.get(id);
                        return m;
                    });
                }),

            ).subscribe(
                (value) => {
                    try {
                        subscriber.next(value);
                    } catch (err) {
                        subscriber.error(err);
                    }
                },
                (err) => subscriber.error(err),
                () => subscriber.complete(),
            );

            return subscription;
        });
    };
};
