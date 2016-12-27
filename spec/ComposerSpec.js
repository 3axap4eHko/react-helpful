'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {} from 'react-addons-test-utils';
import Composer from '../src/Composer';

const DELAY = 50;
const LONG_DELAY = 5000;

function actionFactory() {
    return () => new Promise( resolve => setTimeout(resolve, DELAY, Date.now()));
}

function longActionFactory() {
    return () => new Promise( resolve => setTimeout(resolve, LONG_DELAY, Date.now()));
}

describe('Composer test suite', () => {

    it('Composer should call actions at the same time', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const actions = Array.from({length: 5}).map(actionFactory);
        ReactDOM.render(<Composer
            actions={actions}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onSuccess={values => {
                const time = values[0];
                const diff = values.map( value => Math.abs(time -value) < DELAY/2);
                expect(diff.every( value => value)).toBeTruthy();
                done()
            }}
        />, root);
    });
    it('Composer should interrupt call actions on cancel', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const actions = Array.from({length: 5}).map(longActionFactory);
        ReactDOM.render(<Composer
            actions={actions}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onCancel={ () => done() }
            onSuccess={ () => expect(true).toBeFalsy()}
            onError={ () => expect(true).toBeFalsy()}
        />, root, () => {
            ReactDOM.unmountComponentAtNode(root);
        });
    });
});