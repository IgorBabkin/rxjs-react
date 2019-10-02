import {IAppViewModel} from './IAppViewModel';
import React from 'react';
import {IView, observer} from '../src';
import './app.scss';

export const AppView: IView<IAppViewModel> = observer(
    ({model}) => {
        return (
            <div className='app'>
                <div>{model.time}</div>
                <div>
                    {model.offers.map((item) => (
                        <div key={item.id}>{item.id}</div>
                    ))}
                </div>
            </div>
        );
    },
);
