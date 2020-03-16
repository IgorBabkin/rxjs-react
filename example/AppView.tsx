import {IAppViewModel} from './IAppViewModel';
import React, {FunctionComponent} from 'react';
import {useObservableValue} from 'reactivex-react';

export const AppView: FunctionComponent<{ model: IAppViewModel }> = ({model}) => {
    const getValue = useObservableValue();
    console.log('render');
    return (
        <div className='app'>
            <div>
                {getValue(model.myNumbers)}
            </div>
            <dl>
                <dt><label htmlFor="firstname">First name</label></dt>
                <dd>
                    <input
                        id="firstname"
                        type="text"
                        onChange={(e) => model.changeFirstName(e.target.value)}
                        defaultValue={getValue(model.firstName)}
                    />
                </dd>

                <dt><label htmlFor="lastname">Last name</label></dt>
                <dd>
                    <input
                        id="lastname"
                        type="text"
                        onChange={(e) => model.changeLastName(e.target.value)}
                        defaultValue={getValue(model.lastName)}
                    />
                </dd>
            </dl>
            <h1>Full name: {getValue(model.firstName)} {getValue(model.lastName)}</h1>
            <button onClick={() => model.toggle()}>Toggle</button>
            {getValue(model.canShowTime) && (
                <div>{new Date(getValue(model.time) || 0).toUTCString()}</div>
            )}
        </div>
    );
};
