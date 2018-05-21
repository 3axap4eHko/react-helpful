import React, { Component } from 'react';
import { func, object, any } from 'prop-types';

export default class IfElse extends Component {
  static propTypes = {
    is: any.isRequired,

    then: func.isRequired,
    else: func,
  };

  static getDerivedStateFromProps({ is, then: thenRender, else: elseRender }) {
    const render = is ? thenRender : elseRender;
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
