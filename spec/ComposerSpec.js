'use strict';

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
        const actions = Array.from({length: 5}).map(actionFactory);
        render(<Composer
            actions={actions}
            renderComplete={() => <div>Complete</div>}
            renderPending={() => <div>Pending</div>}
            onSuccess={values => {
                const time = values[0];
                const diff = values.map( value => Math.abs(time -value) < DELAY/2);
                expect(diff.every( value => value)).toBeTruthy();
                done()
            }}
        />);
    });
    it('Composer should interrupt call actions on cancel', done => {
        const actions = Array.from({length: 5}).map(longActionFactory);
        render(<Composer
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