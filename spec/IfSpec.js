'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {isCompositeComponent } from 'react-addons-test-utils';
import If from '../src/If';

const TAG_NAME_DIV='DIV';
const TAG_NAME_SCRIPT='SCRIPT';
const testText='test text';

class TestComponent extends React.Component {
    render() {
        return <div>{this.props.text}</div>;
    }
}

const props = {
    text: testText
};

describe('If test suite', () => {

    it('If is truthy should rendered render prop', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<If is={true} props={props} render={ ({text}) => <div>{text}</div> }/>, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
        expect(node.innerText).toEqual(testText);
    });
    it('If is truthy should rendered component prop', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<If is={true} props={props} render={TestComponent} />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
        expect(node.innerText).toEqual(testText);
    });
    it('If is falsy and no elseRender defined should rendered default empty component', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<If is={false} render={ () => <div/> }/>, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_SCRIPT);
    });
    it('If is falsy and elseRender defined should rendered elseRender prop', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<If is={false} props={props} render={ () => <div/> } elseRender={ ({text}) => <div>{text}</div> }/>, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
        expect(node.innerText).toEqual(testText);
    });
    it('If is falsy and elseComponent defined should rendered elseRender prop', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        const component = ReactDOM.render(<If is={false} props={props}  render={ () => <div/> } elseRender={TestComponent} />, root);
        expect(isCompositeComponent(component)).toBeTruthy();
        const node = ReactDOM.findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        expect(node.tagName).toEqual(TAG_NAME_DIV);
        expect(node.innerText).toEqual(testText);
    });
});