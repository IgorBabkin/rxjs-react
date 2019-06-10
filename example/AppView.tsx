import { IAppViewModel } from './IAppViewModel';
import React from 'react';
import { IView, observer } from '../src';
import './app.scss';

export const AppView: IView<IAppViewModel> = observer(
    ({ model }) => {
        return (
            <div className='app'>
                <div>{model.fullname}</div>
                <div>{model.years}</div>
                <div>{model.version}</div>
                <div>{model.size}</div>
                <input
                    value={model.firstname}
                    onChange={({target}) => model.changeFirstname(target.value)}
                />
                <button onClick={() => model.incrementSize()}>Change size</button>
            </div>
        );
    },
);
