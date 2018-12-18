import React, { Component } from 'react';
import { func, object, any } from 'prop-types';

export default class If extends Component {
  static propTypes = {
    is: any.isRequired,
    children: func.isRequired,
  };

  render() {
    const { is, children } = this.props;
    if (is) {
      return children();
    }
    return null;
  }
}
