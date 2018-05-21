import React, { Component } from 'react';
import { func, array, object, oneOfType } from 'prop-types';

export default class For extends Component {

  static propTypes = {
    items: array.isRequired,
    each: func.isRequired,
  };

  static getDerivedStateFromProps({ items, each }) {
    return {
      children: Object.entries(items).map(([key, value], id) => each(value, key, id)),
    };
  }

  state = {};

  render() {
    const { children } = this.state;
    return children;
  }
}
