import {IAppViewModel} from './IAppViewModel';
import React, {FunctionComponent} from 'react';
import {useObservableValue} from '../src';
import './app.scss';

export const AppView: FunctionComponent<{ model: IAppViewModel }> = ({model}) => {
    const getValue = useObservableValue();
    console.log('render');
    return (
        <div className='app'>
            <button onClick={() => model.toggle()}>Toggle</button>
            {getValue(model.canShowTime) && (
                <div>{new Date(getValue(model.time) || 0).toUTCString()}</div>
            )}
        </div>
    );
};
