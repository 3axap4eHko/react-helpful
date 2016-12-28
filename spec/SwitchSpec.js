'use strict';

import Switch from '../src/Switch';

const TAG_NAME_DIV='DIV';
const TAG_NAME_SCRIPT='SCRIPT';
const testText='test text';
const anotherTestText='another test text';

class TestComponent extends React.Component {
    render() {
        return <div>{testText}</div>;
    }
}

class AnotherTestComponent extends React.Component {
    render() {
        return <div>{anotherTestText}</div>;
    }
}

const cases = {
    test: TestComponent,
    anotherTest: AnotherTestComponent
};


describe('Switch test suite', () => {

    it('should render case if value is case ', () => {
        const component = render( <Switch value="test" cases={cases} /> );
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
        expect(node.innerText).toEqual(testText);
    });
    it('should render case if value is case', () => {
        const component = render( <Switch value="anotherTest" cases={cases} /> );
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
        expect(node.innerText).toEqual(anotherTestText);
    });

    it('should render default if value is not case', () => {
        const component = render( <Switch value="yetAnotherTest" cases={cases} def={ () => <div/> } />);
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
    });

    it('should render the comment if value is not case', () => {
        const component = render( <Switch value="yetAnotherTest" cases={cases} comment="comment" /> );
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_SCRIPT);
    });

    it('should nothing render if no comment and value is not case', () => {
        const component = render( <Switch value="yetAnotherTest" cases={cases} />);
        const node = findDOMNode(component);
        expect(node).toEqual(null);
    });

});