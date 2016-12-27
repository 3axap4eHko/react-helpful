'use strict';

import React, {Component, PropTypes} from 'react';
import Await from './Await';
import {request} from './utils';

const {string, object, func, bool} = PropTypes;

class Request extends Component {
    static propTypes = {
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
        onStart(){
        },
        onProgress(){
        },
        onSuccess(){
        },
        onError(){
        },
        onCancel(){
        }
    };

    onStart = (resolve, reject) => {
        const {url, method, query = {}, data = null, headers = {}, username, password, onStart, onProgress} = this.props;
        const options = {
            url,
            query,
            method,
            data,
            headers,
            username,
            password,
            onStart,
            onProgress,
            onSuccess: resolve,
            onError: reject
        };
        const xhr = request(options);
        this.setState({xhr})
    };

    onCancel = () => {
        if (this.state.xhr !== XMLHttpRequest.DONE) {
            this.state.xhr.abort();
        }
    };

    render() {
        const {renderComplete, renderPending, onSuccess, onError} = this.props;
        return <Await
            renderComplete={renderComplete}
            renderPending={renderPending}
            onStart={this.onStart}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={this.onCancel}
        />;
    }
}

export default Request;