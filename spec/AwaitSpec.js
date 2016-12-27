'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {  } from 'react-addons-test-utils';
import Await from '../src/Await';

function successTaskFactory(delay = 500) {
    return () => new Promise( resolve => setTimeout(resolve, delay, true));
}

function failTaskFactory(delay) {
    return () => new Promise( (resolve, reject) => setTimeout(reject, delay, true));
}

describe('Await test suite', () => {
    it('test successTask', done => {
        const task = successTaskFactory();
        task().then(done);
    });

    it('test failTask', done => {
        const task = failTaskFactory();
        task()
            .then( () => expect(true).toBeFalsy() )
            .catch(done);
    });

    it('Await should await success task', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const task = successTaskFactory();
        const component = ReactDOM.render(<Await
            renderComplete={ () => <div/>}
            renderPending={ () => <div/>}
            onStart={ (resolve, reject) => {
                task()
                    .then(resolve)
                    .catch(reject)
            }}
            onSuccess={ value => {
                expect(value).toBeTruthy();
                const node = ReactDOM.findDOMNode(component);
                expect(node instanceof HTMLElement).toBeTruthy();
                done();
            }}
            onError={ () => {
                expect(false).toBeTruthy();
            }}
            onCancel={ () => {
                expect(false).toBeTruthy();
            }}
            />, root);
    });

    it('Await should await error task', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const task = failTaskFactory();
        const component = ReactDOM.render(<Await
            renderComplete={ () => <div/>}
            renderPending={ () => <div/>}
            onStart={ (resolve, reject) => {
                task()
                    .then(resolve)
                    .catch(reject)
            }}
            onSuccess={ () => {
                expect(false).toBeTruthy();
            }}
            onError={ value => {
                expect(value).toBeTruthy();
                done();
            }}
            onCancel={ () => {
                expect(false).toBeTruthy();
            }}
            />, root);
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
    });
    it('Await should cancel on umount', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const task = failTaskFactory(2000);
        ReactDOM.render(<Await
            renderComplete={ () => <div/>}
            renderPending={ () => <div/>}
            onStart={ (resolve, reject) => {
                task()
                    .then(resolve)
                    .catch(reject)
            }}
            onSuccess={ () => {
                expect(true).toBeFalsy();
            }}
            onError={ () => {
                expect(false).toBeTruthy();
            }}
            onCancel={ error => {
                expect(error.isCanceled).toBeTruthy();
                done();
            }}
            />, root, () => {
            const isUnmounted = ReactDOM.unmountComponentAtNode(root);
            expect(isUnmounted).toBeTruthy();
        });
    });
});