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
Empty script component with comments
``` javascript
<Empty comment="empty component comment"/>
```
rendered as
``` html
<script>
/**
 * empty component comment
 */
</script>
```

### <a name="If"></a> If
Case component rendering with arguments and comment by render callback
``` javascript
<Switch value={value}
    props={myProps}
    case={{
        value1: MyComponent,
        value2(props) {
            return <MyAnotherComponent {...props} />
        }
    }}
    def={DefaultComponent}
    comment="switch case"
/>
```

### <a name="Switch"></a> Switch
Condition component rendering with arguments and comment by render callback
``` javascript
<If is={condition}
    props={myProps}
    render={ (myProps) => <Component prop={myProps} /> }
    elseRender={ (myProps) => <AnotherComponent prop={myProps} /> }
    comment="if condition"
/>
```
or just a Component
``` javascript
<If is={condition}
    props={myProps}
    render={Component}
    elseRender={AnotherComponent}
    comment="if condition"
/>
```

### <a name="EventListener"></a> EventListener
Capturing event globally
``` javascript
<EventListener
    event="click"
    on={this.onClick}
/>
```
or by selector
``` javascript
<ElementEventListener
    target="#target"
    event="click"
    on={this.onClick}
/>
```

### <a name="Await"></a> Await
Await promise complete, if component will be unmounted it trigger onCancel
``` javascript
onStart(resolve, reject) {
    setTimeout(resolve, 1000, 'some data');
}
// ...
<Await
    renderComplete={({error, value}) => <div>Complete</div>}
    renderPending={() => <div>Pending</div>}
    onStart={ this.onStart }
    onSuccess={ this.onSuccess }
    onError={ this.onError }
    onCancel={ this.onCancel }
/>
```

### <a name="Sequencer"></a> Sequencer
Sequenced promised functions execution
``` javascript
<Sequencer
    actions={[configLoadAction, configDependedDataLoad]}
    renderComplete={({error, values}) => <div>Complete</div>}
    renderPending={() => <div>Pending</div>}
    onStart={ this.onStart }
    onSuccess={ this.onSuccess }
    onError={ this.onError }
    onCancel={ this.onCancel }
/>
```

### <a name="Composer"></a> Composer
Parallel promised functions execution
``` javascript
<Composer
    actions={[friendsLoadAction, messagesLoadAction]}
    renderComplete={({error, values}) => <div>Complete</div>}
    renderPending={() => <div>Pending</div>}
    onStart={ this.onStart }
    onSuccess={ this.onSuccess }
    onError={ this.onError }
    onCancel={ this.onCancel }
/>
```

### <a name="Request"></a> Request
Request rendering component
``` javascript
<Request
    url={requestUrl}
    query={queryObject}
    method="POST"
    headers={headers}
    data={data}
    // Basic Authentication
    username={username}
    password={password}

    onStart={this.onStart}
    onProgress={this.onProgress}
    onSuccess={this.onSuccess}
    onError={this.onError}
    onCancel={this.onCancel}

    renderComplete={this.renderOnComplete}
    renderPending={this.renderOnPending}
/>
```

## License
[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2016-present Ivan Zakharchenko