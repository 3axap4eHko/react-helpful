import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import AsyncComposer from '../AsyncComposer';

function actionFactory() {
  return () => new Promise(resolve => setTimeout(resolve, 50, Date.now()));
}

test('AsyncComposer', async () => {
  const actions = Array.from({ length: 5 }).map(actionFactory);
  const context = {};
  const waiting = new Promise((resolve, reject) => {
    context.resolve = resolve;
    context.reject = reject;
  });

  const app = (
    <AsyncComposer
      id={Math.random()}
      actions={actions}
      onDone={(error, result) => context.resolve(result)}
    >
      {({ result, error, loading }) => {
        if (loading) {
          return null;
        }
        return 'done';
      }}
    </AsyncComposer>
  );

  context.component = renderer.create(app);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  const result = await waiting;
  const delta = Math.max(...result) - Math.min(...result);
  expect(delta).toBeLessThan(10);
  expect(context.component.toJSON()).toBe('done');
});
