[![NPM version:latest](https://img.shields.io/npm/v/moq.ts/latest.svg?style=flat-square)](https://www.npmjs.com/package/reactivex-react)
[![npm downloads](https://img.shields.io/npm/dt/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/reactivex-react)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/moq.ts.svg)](https://www.npmjs.com/package/reactivex-react)

[![License](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/reactivex-react)

# RxjsReact
React hooks to observe values from rxjs Observable.
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

[See example](https://github.com/IgorBabkin/rxjs-react/blob/master/example/AppView.tsx)
