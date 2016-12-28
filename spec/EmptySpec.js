'use strict';

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
        const component = render(<Empty comment={TEST_COMMENT}/>);
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME);
    });
});