'use strict';

import React, {Component, PropTypes} from 'react';
import If from './If';
import {PromiseCancelable} from './utils';

const {any, func, string} = PropTypes;
const _cancel = Symbol('cancel');

function getPromiseCancelable(onStart, onSuccess, onError) {
    const result = PromiseCancelable((resolve, reject) => onStart(resolve, reject));
    result.promise
        .then(onSuccess)
        .catch(onError);
    return result;
}

class Await extends Component {
    static propTypes = {
        id: any,

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
        this[_cancel] = cancel;
    }

    componentWillUnmount() {
        this[_cancel](null, this.props.id);
    }

    onStart = (resolve, reject) => {
        this.setState({done: false});
        const {id, onStart} = this.props;
        if (onStart) {
            onStart(resolve, reject, id);
        }
    };
    onSuccess = (value) => {
        this.setState({value, done: true});
        const {id, onSuccess} = this.props;
        if (onSuccess) {
            onSuccess(value, id);
        }
    };
    onError = (error) => {
        if (!error || !error.isCanceled) {
            this.setState({error, done: true});
            const {id, onError} = this.props;
            if (onError) {
                onError(error, id);
            }
        } else {
            const {id, onCancel} = this.props;
            if (onCancel) {
                onCancel(error, id);
            }
        }
    };

    render() {
        const {done, value, error} = this.state;
        const {renderComplete, renderPending, comment, id} = this.props;
        return <If is={done}
                   props={{error, value, id}}
                   render={renderComplete}
                   elseRender={renderPending}
                   comment={comment}
        />;
    }
}

export default Await;