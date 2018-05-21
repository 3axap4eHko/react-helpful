import React, { Component } from 'react';
import { object } from 'prop-types';
import createHoc from './createHOC';

const esModuleFlag = '__esModule';

export default createHoc(dynamicImport => class Import extends Component {

  static getDerivedStateFromProps(nextProps) {
    const awaiting = dynamicImport(nextProps);
    return {
      awaiting,
      loading: true,
      result: null,
    };
  }

  state = {
    loading: false,
    DynamicComponent: null,
  };

  setResult = (result, error) => {
    const DynamicComponent = result && result[esModuleFlag] ? result.default : result;
    this.setState({ DynamicComponent, error, loading: false });
  };

  componentDidMount() {
    this.state.awaiting
      .then(result => this.setResult(result))
      .catch(error => this.setResult(null, error));
  }

  componentWillUnmount() {
    this.setResult = () => {};
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    const { DynamicComponent } = this.state;
    return <Import.WrappedComponent {...this.props} DynamicComponent={DynamicComponent} />;
  }
});
