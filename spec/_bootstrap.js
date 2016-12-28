'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom';

/* global it, expect */
global.React = React;
global.ReactDOM = ReactDOM;
global.findDOMNode = ReactDOM.findDOMNode;
global.unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
global.TestUtils = TestUtils;

global.throwError = message => {
    return () => {throw new Error(message)};
};

global.render = (element, done = () => {}) => {
    const rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    return ReactDOM.render(element, rootNode, () => done(rootNode));
};

global.eventFire = (selector, event) => {
    const element = document.querySelector(selector);
    const eventObject = document.createEvent('Events');
    eventObject.initEvent(event, true, false);
    element.dispatchEvent(eventObject);
};

const components = new Map();
global.hook = (component, method, callback) => {
    if (!components.has(component)) {
        components.set(component, {});
    }
    const hooks = components.get(component);
    if (!hooks[method]) {
        hooks[method] = [];
        const __hookedMethod = component[method] || (() => {});
        component[method] = function(...args) {
            hooks[method] = hooks[method].filter( hookCallback => hookCallback(...args) );
            __hookedMethod(...args);
        }
    }
    hooks[method].push(callback);
};


describe('Environment for tests', function () {
    it('Process should not be production for React console warnings', function () {
        expect(process.env.NODE_ENV).toEqual('development', 'env is development');
    });

    it('Ensure the React version used', function () {
        let ver = +React.version.replace(/(\d+)\.(\d+)*/, '$1');
        expect(ver >= 15).toBeTruthy();
    });

    it('Test hook should works', done => {
        class TestHookComponent extends React.Component {
            componentDidMount() {
                setTimeout( cmp => cmp.setState({}) || done(), 100, this);
            }
            render() {
                return (<div />)
            }
        }
        const component = render(<TestHookComponent />);
        hook(component, 'componentWillUpdate', () => done());
    });
});

const testsContext = require.context('./', true, /Spec\.jsx?$/);
testsContext.keys().forEach( testsContext );
