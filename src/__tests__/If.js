import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import If from '../If';

class App extends Component {
  render() {
    return (
      <If is={this.props.test}>
        {() => 'test'}
      </If>
    );
  }
}

test('If is false condition', async () => {
  const context = {};
  context.component = renderer.create(<App test={false} />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});

test('If is true condition', async () => {
  const context = {};
  context.component = renderer.create(<App test={true} />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('test');
});
