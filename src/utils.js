'use strict';

const defaultXHROptions = {
    query: {},
    method: 'GET',
    data: null,
    headers: {},
    charset: 'utf-8',
    responseType: '',
    onStart() {},
    onProgress() {},
    onSuccess() {},
    onError() {},
    onCancel() {}
};

const componentNameExpr = /^[A-Z]/;

export function isComponent(value) {
    return typeof value === 'function' && componentNameExpr.test(value.name);
}

export function buildQuery(data = {}) {
    return Object.keys(data).map( key => {
        const name = encodeURIComponent(key);
        const values = data[key];
        if(Array.isArray(values)) {
            return values.map( value => `${name}=${encodeURIComponent(value)}`).join('&');
        }
        return `${name}=${encodeURIComponent(values)}`;
    }).join('&');
}

function getUrl({url, query}) {
    const rawQuery = buildQuery(query || {});
    if (rawQuery) {
        return `${url}?${rawQuery}`;
    }
    return url;
}

export function request(options) {
    options = {...defaultXHROptions, ...options};
    options.method = options.method.toUpperCase();

    const xhr = new XMLHttpRequest();
    xhr.addEventListener( 'progress', () => options.onProgress(xhr) );
    xhr.addEventListener( 'load', () => {
        const isSuccess = ((xhr.status / 100)|0) === 2;
        if (isSuccess) {
            options.onSuccess(xhr);
        } else {
            options.onError(xhr);
        }
    } );
    xhr.addEventListener( 'error', () => options.onError(xhr) );
    xhr.addEventListener( 'abort', () => options.onCancel(xhr) );

    const url = getUrl(options);
    xhr.open( options.method, url, true );

    if ( options.withCredentials ) {
        xhr.withCredentials = true;
    }
    const {username, password} = options;
    if(username && password) {
        const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
        xhr.setRequestHeader( 'Authorization', basicAuth );
    }

    Object.keys( options.headers ).forEach( name => {
        let values = options.headers[name];
        if ( !Array.isArray( values ) ) {
            values = [values];
        }
        values.forEach( value => xhr.setRequestHeader( name, value ) );
    } );
    xhr.responseType = options.responseType;
    options.onStart( xhr );
    xhr.send( options.data );

    return xhr;
}

export const PromiseCancelable = promiseFunction => {
    const context = {};
    const promise = new Promise((resolve, reject) => {
        promiseFunction(resolve, reject);
        context.resolve = resolve;
        context.reject = reject;
    });
    return {
        promise,
        cancel(customError) {
            const error = customError || new Error('Promise is canceled');
            error.isCanceled = true;
            context.reject(error);
            return promise;
        }
    };
};