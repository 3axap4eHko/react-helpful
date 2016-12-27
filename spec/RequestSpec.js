'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {isCompositeComponent} from 'react-addons-test-utils';
import Request from '../src/Request';

const TAG_NAME_DIV='DIV';

function errorThrow(message) {
    return () => new Error(message);
}

describe('Request test suite', () => {

    it('Request should call onError if request is incorrect', done => {
        const requestUrl = 'http://url-does-not-exists';
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<Request
            url={requestUrl}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onError={done}
        />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
    });

    it('Request should call onSuccess if request is correct', done => {
        const requestUrl = '/base/spec/data.json';
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<Request
            url={requestUrl}
            headers={{Test: 'Test'}}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onSuccess={xhr => {
                expect(xhr.status).toEqual(200);
                done();
            }}
            onError={() => {
                expect(errorThrow(`Url "${requestUrl}" not found`)).not.toThrowError();
                done();
            }}
        />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
    });

    it('Request should call onSuccess if request is correct', done => {
        const requestUrl = '/does-not-exist.json';
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<Request
            url={requestUrl}
            headers={{Test: 'Test'}}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onSuccess={() => {
                expect(errorThrow('Not existing url should throw an Error')).not.toThrowError();
                done();
            }}
            onError={xhr => {
                expect(xhr.status).toEqual(404);
                done();
            }}
        />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
    });

    it('Request should call onStart before request proceed', done => {
        const requestUrl = 'http://url-does-not-exists';
        const root = document.createElement('div');
        document.body.appendChild(root);
        ReactDOM.render(<Request
            url={requestUrl}
            headers={{Test: 'Test'}}
            data="{}"
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onStart={done}
            onSuccess={() => {
                expect(errorThrow('onStart was not called before request completion')).not.toThrowError();
                done();
            }}
        />, root);
    });

});