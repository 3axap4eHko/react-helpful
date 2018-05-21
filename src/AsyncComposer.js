import React, { Component } from 'react';
import { func, arrayOf, any } from 'prop-types';
import withAwait from './withAwait';

function actionExecutor(props) {
  return () => Promise.all(props.actions.map(action => action(props)));
}

@withAwait(actionExecutor)
export default class AsyncComposer extends Component {

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
