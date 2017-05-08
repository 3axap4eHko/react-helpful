import Switch from '../src/Switch';

import TestComponent from './fixtures/TestComponent';

const TAG_NAME_DIV = 'DIV';
const TAG_NAME_SCRIPT = 'SCRIPT';
const testText = 'test text';
const anotherTestText = 'another test text';

const cases = {
  test: function TestA() {
    return <TestComponent text={testText} />
  },
  anotherTest: function TestB() {
    return <TestComponent text={anotherTestText} />
  },
};


describe('Switch test suite', () => {
  it('should render case if value is case ', () => {
    const component = render(<Switch value="test" cases={cases} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
    expect(node.innerText).toEqual(testText);
  });
  it('should render case if value is case', () => {
    const component = render(<Switch value="anotherTest" cases={cases} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
    expect(node.innerText).toEqual(anotherTestText);
  });

  it('should render default if value is not case', () => {
    const component = render(<Switch value="yetAnotherTest" cases={cases} def={() => <div />} />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
  });

  it('should render the comment if value is not case', () => {
    const component = render(<Switch value="yetAnotherTest" cases={cases} comment="comment" />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_SCRIPT);
  });

  it('should nothing render if no comment and value is not case', () => {
    const component = render(<Switch value="yetAnotherTest" cases={cases} />);
    const node = findDOMNode(component);
    expect(node).toEqual(null);
  });
});
