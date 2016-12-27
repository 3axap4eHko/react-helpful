'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Sequencer from '../src/Sequencer';

const DELAY = 50;
const LONG_DELAY = 5000;

function actionFactory() {
    return () => new Promise( resolve => setTimeout(resolve, DELAY, Date.now()));
}

function longActionFactory() {
    return () => new Promise( resolve => setTimeout(resolve, LONG_DELAY, Date.now()));
}

describe('Sequencer test suite', () => {

    it('Sequencer should call actions one by one', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const actions = Array.from({length: 5}).map(actionFactory);
        ReactDOM.render(<Sequencer
            actions={actions}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onSuccess={ values => {
                const time = Date.now();
                const diff = values.map( (value, idx) => ((values[idx+1] || time) - value) > DELAY/2);
                expect(diff.every(value => value)).toBeTruthy();
                done()
            }}
        />, root);
    });

    it('Sequencer should interrupt call actions on cancel', done => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const actions = Array.from({length: 5}).map(longActionFactory);
        ReactDOM.render(<Sequencer
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