import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import createHOC from '../createHOC';

test('createHOC', async () => {
  const withPropsHOC = createHOC(props => class PropsHOC extends Component {
    render() {
      return <PropsHOC.WrappedComponent {...this.props} {...props} />;
    }
  }, 'include');

  @withPropsHOC({ value: 'test' })
  class App extends Component {
    render() {
      return this.props.value;
    }
  }

  expect(App.displayName).toBe('includePropsHOC(App)');
  const context = {};
  context.component = renderer.create(<App />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('test');
});
