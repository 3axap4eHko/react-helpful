import React, { Component } from 'react';
import { object, func } from 'prop-types';
import createHoc from './createHOC';

export default createHoc(getAwait => class Await extends Component {

  state = {
    loading: false,
    result: null,
    error: null,
  };

  setStateAsync = state => new Promise(r => this.setState(state, r));

  setResult = (error, result) => {
    this.setState({ result, error, loading: false });
  };

  async componentDidMount() {
    try {
      await this.setStateAsync({
        loading: true,
        result: null,
      });
      const result = await getAwait(this.props)();
      this.setResult(null, result);
    } catch (error) {
      this.setResult(error);
    }
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
