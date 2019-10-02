import { TestViewModel } from '../TestViewModel';
import { subscribeToModel } from '../subscribeToModel';

describe('SubscribeToMode', () => {

    test('dfs', () => {
        const viewModel = new TestViewModel();

        subscribeToModel(viewModel, ({ firstname }) => {
            expect(firstname).toBe('Igor');
        });
    });

});
