'use strict';

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
        const actions = Array.from({length: 5}).map(actionFactory);
        render(<Sequencer
            actions={actions}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onSuccess={ values => {
                const time = Date.now();
                const diff = values.map( (value, idx) => ((values[idx+1] || time) - value) > DELAY/2);
                expect(diff.every(value => value)).toBeTruthy();
                done();
            }}
        />);
    });

    it('Sequencer should interrupt call actions on cancel', done => {
        const actions = Array.from({length: 5}).map(longActionFactory);
        render(<Sequencer
            actions={actions}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onCancel={ () => done() }
            onSuccess={ () => expect(true).toBeFalsy()}
            onError={ () => expect(true).toBeFalsy()}
        />, rootNode => {
            unmountComponentAtNode(rootNode);
        });
    });
});