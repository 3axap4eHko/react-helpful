'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {isCompositeComponent } from 'react-addons-test-utils';
import Empty from '../src/Empty';

const TAG_NAME='SCRIPT';
const TEST_COMMENT = `
this
is 
a 
multiline
test
comment
`;
describe('Empty test suite', () => {

    it('Empty should render comment', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<Empty comment={TEST_COMMENT}/>, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME);
    });
});