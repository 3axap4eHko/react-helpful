import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import withImport from '../withImport';

function AsyncComponent() {
  return 'test';
}

class Async extends Component {
  render() {
    const { DynamicComponent } = this.props;
    if (DynamicComponent) {
      return <DynamicComponent />;
    }
    return null;
  }
}

test('withImport await promise', async () => {
  const asyncImport = new Promise(resolve => setTimeout(resolve, 100, AsyncComponent));
  const AsyncWithImport = withImport(() => asyncImport)(Async);
  const context = {};
  context.component = renderer.create(<AsyncWithImport />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  await asyncImport;
  expect(context.component.toJSON()).toBe('test');
});
