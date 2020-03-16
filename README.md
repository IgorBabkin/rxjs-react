# RxjsReact

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
