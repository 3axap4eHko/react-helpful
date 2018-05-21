import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import renderIf from '../renderIf';

@renderIf(({ test }) => test)
class App extends Component {
  render() {
    return 'test';
  }
}

test('renderIf false condition', async () => {
  const context = {};
  context.component = renderer.create(<App test={false} />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});

test('renderIf true condition', async () => {
  const context = {};
  context.component = renderer.create(<App test={true} />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('test');
});
