'use strict';

import {PromiseCancelable} from '../src/utils';

describe('CancelablePromise test suite', () => {

    it('CancelablePromise should be canceled before complete', done => {
        const {promise, cancel} = PromiseCancelable( resolve => {
            setTimeout(resolve, 1000, {});
        });
        promise.catch( error => {
            expect(error.isCanceled).toBeTruthy();
            done();
        });
        cancel();
    });
    it('CancelablePromise should be canceled before complete', done => {
        const {promise, cancel} = PromiseCancelable((resolve, reject) => {
            setTimeout(reject, 1000, {});
        });
        promise.catch( error => {
            expect(error.isCanceled).toBeTruthy();
            done();
        });
        cancel();
    });
});