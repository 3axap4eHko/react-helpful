import React, { Component } from 'react';
import { func, object, any } from 'prop-types';

export default class Switch extends Component {
  static propTypes = {
    value: any.isRequired,
    cases: object.isRequired,
    default: func.isRequired,
  };

  static getDerivedStateFromProps({ value, cases, 'default': def }) {
    const render = cases[value] || def;

    return {
      render,
    };
  }

  state = {};

  render() {
    const { render } = this.state;
    if (render) {
      return render();
    }
    return null;
  }
}
