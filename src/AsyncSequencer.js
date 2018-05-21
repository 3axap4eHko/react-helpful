import React, { Component } from 'react';
import { any, func, arrayOf } from 'prop-types';
import withAwait from './withAwait';

function actionExecutor(props) {
  return async () => {
    const iterator = props.actions[Symbol.iterator]();
    const results = [];
    let item = iterator.next();
    while (!item.done) {
      const result = await item.value(props);
      results.push(result);
      item = iterator.next();
    }
    return results;
  };
}

@withAwait(actionExecutor)
export default class AsyncSequencer extends Component {

  static propTypes = {
    id: any,
    actions: arrayOf(func).isRequired,
    children: func.isRequired,
  };

  render() {
    const { id, data, children: Children } = this.props;
    return <Children id={id} {...data} />;
  }
}
