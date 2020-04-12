# React hooks to observe values from rxjs Observable.

[![Build Status](https://travis-ci.com/IgorBabkin/rxjs-react.svg?branch=master)](https://travis-ci.com/IgorBabkin/rxjs-react)
[![NPM version:latest](https://img.shields.io/npm/v/reactivex-react/latest.svg?style=flat-square)](https://www.npmjs.com/package/reactivex-react)
[![npm downloads](https://img.shields.io/npm/dt/reactivex-react.svg?style=flat-square)](https://www.npmjs.com/package/reactivex-react)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/reactivex-react.svg)](https://www.npmjs.com/package/reactivex-react)
[![License](https://img.shields.io/npm/l/reactivex-react)](https://www.npmjs.com/package/reactivex-react)

- lazy - it doesn't subscribe until you invoke it
- unsubscribe automatically from not used values
- unsubscribe automatically when component is unmounted

## How to install

```sh
# NPM
npm install reactivex-react
# Yarn
yarn add reactivex-react
```

### Usage

```jsx
import {useObservableValue} from 'reactivex-react';

const currentTime$ = timer(0, 1000).pipe(
    map(() => Date.now()),
);

const Counter = (props) => {
  const getValue = useObservableValue();
  return (
    <div>Current time: {getValue(props.currentTime)}</div>
  );
};

render(
    <Counter currentTime={currentTime$}/>,
    document.getElementById('root'),
);
```

### API

`useObservableValue` - creates reader which needs to get current value and subscribes to observable.

[See example](https://github.com/IgorBabkin/rxjs-react/blob/master/example/AppView.tsx)
