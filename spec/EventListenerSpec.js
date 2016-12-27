'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { isCompositeComponent } from 'react-addons-test-utils';
import EventListener from '../src/EventListener';

function eventFire(selector, event){
    const element = document.querySelector(selector);
    var eventObject = document.createEvent('Events');
    eventObject.initEvent(event, true, false);
    element.dispatchEvent(eventObject);
}

describe('EventListener test suite', () => {
    it('EventListener be triggered by selector', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const Component = React.createClass({
            render() {
                return <div id="target" ref="target">
                    <EventListener
                        target="#target"
                        event="click"
                        on={this.props.onClick}
                    />
                </div>
            }
        });
        const component = ReactDOM.render(<Component onClick={done} />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        eventFire('#target', 'click');
    });
    it('EventListener can be triggered by global event', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const Component = React.createClass({
            render() {
                return <EventListener
                    event="click"
                    on={this.props.onClick}
                />;
            }
        });
        const component = ReactDOM.render(<Component onClick={done} />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        eventFire('body', 'click');
    });
});