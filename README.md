# React Helpful

[![build status](https://travis-ci.org/3axap4eHko/react-helpful.svg?branch=master)](https://travis-ci.org/3axap4eHko/react-helpful)

## Reference

 - [Empty](#Empty)
 - [If](#If)
 - [Switch](#Switch)
 - [EventListener](#EventListener)
 - [Await](#Await)
 - [Sequencer](#Sequencer)
 - [Composer](#Composer)
 - [Request](#Request)

### <a name="Empty"></a> Empty
Render not drawable `script` tag component with multiline comments
``` javascript
<Empty comment="empty component comment"/>
```
like here
``` html
<script>
/**
 * empty component comment
 */
</script>
```

## Conditional Rendering

Problem is using ternary operator make code ugly and unreadable.
Those components provide possibility render conditional parts in react style

### <a name="If"></a> If
Conditional renderer `If` component

``` javascript
<If is={condition}
    props={myProps}
    render={ (passedMyProps) => <Component {...passedMyProps} /> }
    elseRender={AnotherComponent}
    comment="if condition"
/>
```

### <a name="Switch"></a> Switch
Conditional renderer `Switch` component
``` javascript
<Switch value={value}
    props={myProps}
    cases={{
        value1: MyComponent,
        value2(props) {
            return <MyAnotherComponent {...props} />
        }
    }}
    def={DefaultComponent}
    comment="switch case"
/>
```


### <a name="EventListener"></a> EventListener

DOM event listener

``` javascript
<ElementEventListener
    event="click"
    target="#target"
    excludeParents={['.close', '.exit']}
    on={ event => {} }
    noPrevent={false}
    capture={false}
    once={false}
    passive={false}
/>
```

### <a name="Await"></a> Await
Await promise completion, if component will be unmounted it trigger onCancel
``` javascript
onStart(resolve, reject) {
    setTimeout(resolve, 1000, 'some data');
}
// ...
<Await
    id="any_optional_identifier_of_async_operation"

    renderComplete={({error, value, id}) => <div>Complete</div>}
    renderPending={() => <div>Pending</div>}

    onStart={ (resolve, reject, id) => {} }
    onSuccess={ (value, id) => {} }
    onError={ (error, id) => {} }
    onCancel={ (error, id) => {} }
/>
```

### <a name="Composer"></a> Composer
Parallel promised functions execution
``` javascript
<Composer
    id="any_optional_identifier_of_async_operation"

    actions={[friendsLoadAction, messagesLoadAction]}

    renderComplete={({error, values}) => <div>Complete</div>}
    renderPending={LoadingProgress}

    onStart={ (resolve, reject, id) => {} }
    onSuccess={ (value, id) => {} }
    onError={ (error, id) => {} }
    onCancel={ (error, id) => {} }
/>
```

### <a name="Sequencer"></a> Sequencer
Sequenced promised functions execution
``` javascript
<Sequencer
    id="any_optional_identifier_of_async_operation"

    actions={[configLoadAction, configDependedDataLoad]}

    renderComplete={({error, values}) => <div>Complete</div>}
    renderPending={LoadingProgress}

    onStart={ (resolve, reject, id) => {} }
    onSuccess={ (value, id) => {} }
    onError={ (error, id) => {} }
    onCancel={ (error, id) => {} }
/>
```


### <a name="Request"></a> Request
Request rendering component
``` javascript
<Request
    id="any_optional_identifier_of_async_operation"

    url={requestUrl}
    query={queryObject}
    method="POST"
    headers={headers}
    data={data}
    // Basic Authentication
    username={username}
    password={password}

    onStart={ (xhr, id) => {} }
    onProgress={ (xhr, id) => {} }
    onSuccess={ (xhr, id) => {} }
    onError={ (error, xhr, id) => {} }
    onCancel={ (xhr, id) => {} }

    renderComplete={DisplayResultComponent}
    renderPending={LoadingScreen}
/>
```

## License
[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2016-present Ivan Zakharchenko