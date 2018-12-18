import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import AsyncSequencer from '../AsyncSequencer';

function actionFactory() {
  return () => new Promise(resolve => setTimeout(resolve, 50, Date.now()));
}

test('AsyncSequencer', async () => {
  const actions = Array.from({ length: 5 }).map(actionFactory);
  const context = {};
  const waiting = new Promise((resolve, reject) => {
    context.resolve = resolve;
    context.reject = reject;
  });

  const app = (
    <AsyncSequencer
      id={Math.random()}
      actions={actions}
      onDone={(error, result) => context.resolve(result)}
    >
      {({ result, error, loading }) => {
        if (loading) {
          return null;
        }
        if (error) {
          console.error(error);
        }
        return 'done';
      }}
    </AsyncSequencer>
  );

  context.component = renderer.create(app);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  const result = await waiting;
  const delta = Math.max(...result) - Math.min(...result);
  expect(delta).toBeLessThan(50 * 5);
  expect(delta).toBeGreaterThan(50 * 4);
  expect(context.component.toJSON()).toBe('done');
});
