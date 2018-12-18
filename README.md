# React Helpful

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Reference

 - [asyncComponent](#asyncComponent)
 - [renderIf](#renderIf)
 - [withAwait](#withAwait)
 - [withImport](#withImport)
 - [withMQ](#withMQ)

 - [If](#If)
 - [IfElse](#IfElse)
 - [For](#For)
 - [Switch](#Switch)

 - [EventListener](#EventListener)
 - [AsyncSequencer](#AsyncSequencer)
 - [AsyncComposer](#AsyncComposer)


### <a name="asyncComponent"></a> asyncComponent
Dynamic import component support
```
const AuthPage = asyncComponent(() => import('./pages/auth'));
const DashboardPage = asyncComponent(() => import('./pages/dashboard'));

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/" component={DashboardPage} />
      </Switch>
    );
  }
}
```

### <a name="renderIf"></a> renderIf
Renders component if condition is truthy
```
@renderIf(({ items }) => items && items.length)
class Menu extends Component {
  render() {
    const { items } = this.props;
    return items.map(item => <Item item={item} />)
  }
}
```

### <a name="withAwait"></a> withAwait
Awaits async operation completion
```
@withAwait(({ asyncAction }) => asyncAction)
class Menu extends Component {
  render() {
    const { data: { loading, result, error } } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Error error={error} />;
    }
    return (
      <div>{result}</div>
    );
  }
}
```

### <a name="withImport"></a> withImport
Dynamic import support
```
@withImport(() => import('./Menu'))
class MenuLoader extends Component {
  render() {
    const { DynamicComponent, items } = this.props;
    if (DynamicComponent) {
      return <DynamicComponent items={items} />;
    }
    return <Loading />;
  }
}
```

### <a name="withMQ"></a> withMQ
Matches Media Query conditions
```
@withMQ({
  isPortrait: '(orientation: portrait)',
  isHidden: {
    mediaQuery: '(max-width: 1024px)',
    matches: true,
  },
})
class SideMenu extends Component {
  render() {
    const { isPortrait, isHidden } = this.props;
    return <Menu horizontal={!isPortrait} hidden={isHidden} />;
  }
}
```

### <a name="If"></a> If
Conditional renderer `If` component

``` javascript
<If is={condition}>
  {() => <Component />}
</If>
```

### <a name="IfElse"></a> IfElse
Conditional renderer `IfElse` component

``` javascript
<IfElse
 is={condition}
 then={() => <ComponentA />}
 else={() => <ComponentA />}
/>
```

### <a name="For"></a> For
Loop renderer `For` component

``` javascript
<For
  items={[1,2,3,4,5]}
  each={(value, key) => <div key={key}>{value}</value>}
/>
```

### <a name="Switch"></a> Switch
Conditional renderer `Switch` component
``` javascript
<Switch
  value={value}
  cases={{
    value1: () => <ComponentA />,
    value2: () => <ComponentB />,
    value3: () => <Component3 />,
  }}
  default={() => <ComponentD />}
/>
```


### <a name="EventListener"></a> EventListener
Expects `EventTarget` as target callback result for listening event

``` javascript
<EventListener
  target={() => document}
  event="click"
  selector="#target"
  excludeParents={['.close', '.exit']}
  on={ event => {} }
  prevent={true}
  capture={true}
  once={true}
  passive={false}
/>
```

### <a name="AsyncComposer"></a> AsyncComposer
Execute async actions at the same time and await their completion
``` javascript
const id = 'operation_id';
const actions = [friendsLoadAsync, messagesLoadAsync];

<AsyncComposer id={id} actions={actions}>
{({ id, loading, result, error }) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return <Component result={result} />;
}}
</AsyncComposer>
```

### <a name="AsyncSequencer"></a> AsyncSequencer
Execute async actions one by one and await their completion
``` javascript
const id = 'operation_id';
const actions = [configLoadAsunc, configDependedDataLoadAsync];

<AsyncSequencer id={id} actions={actions}>
{({ id, loading, result, error }) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return <Component result={result} />;
}}
</AsyncSequencer>

```

## License
[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2016-2018 Ivan Zakharchenko


[downloads-image]: https://img.shields.io/npm/dm/react-helpful.svg
[npm-url]: https://www.npmjs.com/package/react-helpful
[npm-image]: https://img.shields.io/npm/v/react-helpful.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-helpful
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-helpful/master.svg
