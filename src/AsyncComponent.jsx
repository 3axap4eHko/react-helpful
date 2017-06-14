import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Empty from './Empty';
import { isComponent } from './utils';
const esModuleFlag = '__esModule';

export default class AsyncComponent extends Component {

  static propTypes = {
    component: func.isRequired,
    props: shape({}),
    loader: func,
    onSuccess: func,
    onError: func,
  };

  static defaultProps = {
    props: {},
    onSuccess: () => null,
    onError: error => console.error(error),
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      Component: null,
    };

    this.loadComponent(props);
  }

  loadComponent = ({ component, onSuccess, onError }) => {
    Promise
      .resolve(component())
      .then(Component => (this.stopLoading && Component) || this.setState({ Component: Component[esModuleFlag] ? Component.default : Component }))
      .then(onSuccess)
      .catch(onError);
  };

  componentWillUnmount() {
    this.stopLoading = true;
  }

  render() {
    const { props, loader:Loader } = this.props;
    const { Component } = this.state;
    if (Component && !this.stopLoading) {
      return <Component {...props} />;
    }
    if (Loader) {
      if (isComponent(Loader)) {
        return <Loader />
      }
      return Loader();
    }
    return <Empty comment="componentLoader" />;
  }
}
