'use strict';

import React, {Component, PropTypes} from 'react';
import If from './If';
import {PromiseCancelable} from './utils';

const {func, string} = PropTypes;
const _Cancel = Symbol('cancel');

function getPromiseCancelable(onStart, onSuccess, onError) {
    const result = PromiseCancelable((resolve, reject) => onStart(resolve, reject));
    result.promise
        .then(onSuccess)
        .catch(onError);
    return result;
}

class Await extends Component {
    static propTypes = {
        renderComplete: func.isRequired,
        renderPending: func.isRequired,

        onStart: func.isRequired,
        onSuccess: func,
        onError: func,
        onCancel: func,

        comment: string
    };

    componentWillMount() {
        const {cancel} = getPromiseCancelable(this.onStart, this.onSuccess, this.onError);
        this[_Cancel] = cancel;
    }

    componentWillUnmount() {
        this[_Cancel]();
    }

    onStart = (resolve, reject) => {
        this.setState({done: false});
        const {onStart} = this.props;
        if (onStart) {
            onStart(resolve, reject);
        }
    };
    onSuccess = (value) => {
        this.setState({value, done: true});
        const {onSuccess} = this.props;
        if (onSuccess) {
            onSuccess(value);
        }
    };
    onError = (error) => {
        if (!error || !error.isCanceled) {
            this.setState({error, done: true});
            const {onError} = this.props;
            if (onError) {
                onError(error);
            }
        } else {
            const {onCancel} = this.props;
            if (onCancel) {
                onCancel(error);
            }
        }
    };

    render() {
        const {done, value, error} = this.state;
        const {renderComplete, renderPending, comment} = this.props;
        return <If is={done}
                   props={{error, value}}
                   render={renderComplete}
                   elseRender={renderPending}
                   comment={comment}
        />;
    }
}

export default Await;