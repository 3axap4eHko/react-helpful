import React, { Component } from 'react';
import { object, func } from 'prop-types';
import createHoc from './createHOC';

export default createHoc(getAwait => class Await extends Component {

  static getDerivedStateFromProps(nextProps) {
    const awaiting = getAwait(nextProps)();

    return {
      awaiting,
      loading: true,
      result: null,
      onDone: func,
    };
  }

  state = {
    loading: false,
    result: null,
  };

  setResult = (error, result) => {
    this.setState({ result, error, loading: false });
  };

  componentDidMount() {
    this.state.awaiting
      .then(result => this.setResult(null, result))
      .catch(error => this.setResult(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading && !this.state.loading && this.props.onDone) {
      this.props.onDone(this.state.error, this.state.result);
    }
  }

  componentWillUnmount() {
    this.setResult = () => {};
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    const { result, error, loading } = this.state;
    return <Await.WrappedComponent {...this.props} data={{ result, error, loading }} />;
  }
});
