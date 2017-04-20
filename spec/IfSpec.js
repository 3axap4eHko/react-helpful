

import If from '../src/If';

const TAG_NAME_DIV = 'DIV';
const TAG_NAME_SCRIPT = 'SCRIPT';
const testText = 'test text';

class TestComponent extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

const props = {
  text: testText,
};

describe('If test suite', () => {
  it('If is truthy should rendered render prop', () => {
    const component = render(<If is props={props} render={({ text }) => <div>{text}</div>} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
    expect(node.innerText).toEqual(testText);
  });
  it('If is truthy should rendered component prop', () => {
    const component = render(<If is props={props} render={TestComponent} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
    expect(node.innerText).toEqual(testText);
  });
  it('If is falsy and no elseRender defined should render default comment', () => {
    const component = render(<If is={false} render={() => <div />} comment="comment" />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_SCRIPT);
  });
  it('If is falsy and no elseRender defined nothing should render', () => {
    const component = render(<If is={false} render={() => <div />} />);
    const node = findDOMNode(component);
    expect(node).toEqual(null);
  });
  it('If is falsy and elseRender defined should rendered elseRender prop', () => {
    const component = render(<If is={false} props={props} render={() => <div />} elseRender={({ text }) => <div>{text}</div>} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
    expect(node.innerText).toEqual(testText);
  });
  it('If is falsy and elseComponent defined should rendered elseRender prop', () => {
    const component = render(<If is={false} props={props} render={() => <div />} elseRender={TestComponent} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
    expect(node.innerText).toEqual(testText);
  });
});
