import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import asyncComponent from '../asyncComponent';

function TestComponent() {
  return 'test';
}

const esComponentLoader = async () => {
  await new Promise(r => setTimeout(r, 300));
  return { __esModule: true, default: TestComponent };
};

const jsComponentLoader = async () => {
  await new Promise(r => setTimeout(r, 300));
  return TestComponent;
};



test('ES6 asyncComponent', async () => {
  const context = {};
  const loading = new Promise(r => context.r = r);
  const EsComponent = asyncComponent(esComponentLoader, {
    loader: () => 'loading',
    onLoad: context.r,
  });
  context.component = renderer.create(<EsComponent />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toContain('loading');
  await loading;
  expect(context.component.toJSON()).toContain('test');
});

test('JS asyncComponent', async () => {
  const context = {};
  const loading = new Promise(r => context.r = r);
  const JSComponent = asyncComponent(jsComponentLoader, {
    loader: () => 'loading',
    onLoad: context.r,
  });
  context.component = renderer.create(<JSComponent />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toContain('loading');
  await loading;
  expect(context.component.toJSON()).toContain('test');
});
