'use strict';

import React, {Component, PropTypes} from 'react';
import Await from './Await';
import {PromiseCancelable} from './utils';

const {any, func, arrayOf} = PropTypes;
const _Cancel = Symbol('cancel');

function _sequencer(actions, setCancel, results = []) {
    if (!actions.length) return Promise.resolve(results);
    const fn = actions.shift();
    const {promise, cancel} = PromiseCancelable((resolve, reject) => {
        fn().then(resolve).catch(reject);
    });
    setCancel(cancel);
    return promise.then(result => _sequencer(actions, setCancel, [...results, result]));
}

class Sequencer extends Component {
    static propTypes = {
        id: any,

        actions: arrayOf(func).isRequired,

        renderComplete: func.isRequired,
        renderPending: func.isRequired,

        onStart: func,
        onSuccess: func,
        onError: func,
        onCancel: func
    };
    onStart = (resolve, reject, id) => {
        const {actions, onStart} = this.props;
        if (onStart) {
            onStart(resolve, reject, id);
        }
        _sequencer(actions, cancel => this[_Cancel] = cancel)
            .then(resolve)
            .catch(reject);
    };
    onCancel = (error, id) => {
        this[_Cancel](error, id);
        const {onCancel} = this.props;
        if (onCancel) {
            onCancel(error, id);
        }
    };

    render() {
        const {id, renderComplete, renderPending, onSuccess, onError} = this.props;
        return <Await
            id={id}
            renderComplete={renderComplete}
            renderPending={renderPending}
            onStart={this.onStart}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={this.onCancel}
        />;
    }
}

export default Sequencer;