import React, { Component } from 'react';
import { func } from 'prop-types';
import createHOC from './createHOC';

export default createHOC(conditionFn => class If extends Component {

  static getDerivedStateFromProps(nextProps) {
    const condition = conditionFn(nextProps);
    return {
      condition,
    };
  }

  state = {};

  render() {
    const { condition } = this.state;
    if (condition) {
      return <If.WrappedComponent {...this.props} />;
    }
    return null;
  }
}, 'render');