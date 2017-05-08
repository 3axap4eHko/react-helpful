import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Await from './Await';
import Empty from './Empty';

class AsyncComponent extends Component {

  static propTypes = {
    component: func.isRequired,
    loader: func,
    props: shape({}),
    onSuccess: func,
    onError: func,
    onCancel: func,
  };

  static defaultProps = {
    loader: Empty,
    onSuccess: () => {},
    onError: () => {},
    onCancel: () => {},
  };

  state = {
    promise: null,
  };

  componentWillMount() {
    const { component } = this.props;
    this.setState({ promise: Promise.resolve(component()) });
  }

  render() {
    const { loader: Loader, onSuccess, onError, onCancel, props } = this.props;
    const { promise } = this.state;

    return (
      <Await
        renderComplete={({ value: LoadedComponent }) => <LoadedComponent {...props} />}
        renderPending={() => <Loader />}
        onStart={(resolve, reject) => promise.then(
          component => resolve(component.__esModule ? component.default : component), reject)}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    );
  }
}

export default AsyncComponent;
