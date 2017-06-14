import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isComponent } from '../src/utils';

class TestClassComponent extends Component {
  render() {
    return (<div />);
  }
}

function TestStatelessComponent() {
  return (<div />);
}

describe('utils test suite', () => {

  it('isComponent', () => {
    expect(isComponent(TestClassComponent)).toBeTruthy();
    expect(isComponent(TestStatelessComponent)).toBeTruthy();
  });
  it('connected isComponent', () => {
    expect(isComponent(connect()(TestClassComponent))).toBeTruthy();
    expect(isComponent(connect()(TestStatelessComponent))).toBeTruthy();
  });
  it('routed isComponent', () => {
    expect(isComponent(withRouter(TestClassComponent))).toBeTruthy();
    expect(isComponent(withRouter(TestStatelessComponent))).toBeTruthy();
  });
});
