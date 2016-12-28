'use strict';

import React, {Component, PropTypes} from 'react';
import Await from './Await';
import {request} from './utils';

const {any, string, object, func, bool} = PropTypes;

const _xhr = Symbol('xhr');

class Request extends Component {
    static propTypes = {
        id: any,

        url: string.isRequired,
        method: string,
        headers: object,
        query: object,
        data: string,
        withCredentials: bool,
        username: string,
        password: string,

        renderComplete: func.isRequired,
        renderPending: func.isRequired,

        onStart: func,
        onProgress: func,
        onSuccess: func,
        onError: func,
        onCancel: func
    };
    static defaultProps = {
        method: 'GET',
        headers: {},
        data: null,
        withCredentials: true,
        onStart() {},
        onProgress() {},
        onSuccess() {},
        onError() {},
        onCancel() {}
    };

    onStart = (onSuccess, onError, id) => {
        const {url, method, query = {}, data = null, headers = {}, username, password, onStart, onProgress} = this.props;
        const options = {
            url,
            query,
            method,
            data,
            headers,
            username,
            password,

            onStart(xhr) {
                onStart(xhr, id);
            },
            onProgress(xhr) {
                onProgress(xhr, id);
            },
            onSuccess,
            onError
        };
        this[_xhr] = request(options);
    };
    onError = (error) => {
        this.props.onError(error, this[_xhr], this.props.id);
    };
    onCancel = () => {
        if (this[_xhr] !== XMLHttpRequest.DONE) {
            this[_xhr].abort();
        }
        this.props.onCancel(this[_xhr], this.props.id);
    };

    render() {
        const {id, renderComplete, renderPending, onSuccess} = this.props;
        return <Await
            id={id}
            renderComplete={renderComplete}
            renderPending={renderPending}
            onStart={this.onStart}
            onSuccess={onSuccess}
            onError={this.onError}
            onCancel={this.onCancel}
        />;
    }
}

export default Request;