import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import withAwait from '../withAwait';

function timeout(time, ...args) {
  return new Promise(resolve => setTimeout(resolve, time, ...args));
}

@withAwait(({ request }) => request)
class Async extends Component {

  render() {
    const { data: { result, error } } = this.props;
    if (error) {
      return error.message;
    }
    return result;
  }
}

test('withAwait await promise', async () => {
  const context = {};
  const waiting = new Promise(resolve => context.resolve = resolve);
  context.component = renderer.create(<Async
    request={() => timeout(100, 'test')}
    onDone={context.resolve}
  />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  await waiting;
  expect(context.component.toJSON()).toBe('test');
});

test('withAwait error promise', async () => {
  const context = {};
  const waiting = new Promise((resolve, reject) => {
    context.resolve = resolve;
    context.reject = reject;
  });
  context.component = renderer.create(<Async
    request={() => new Promise(() => { throw new Error('error');})}
    onDone={context.reject}
  />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  try {
    await waiting;
  } catch (e) {
    expect(e.message).toBe('error');
  }
  expect(context.component.toJSON()).toBe('error');
});
