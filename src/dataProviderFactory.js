import React, { Component, createContext } from 'react';
import { object } from 'prop-types';

export default function dataProviderFactory(condition = () => true) {
  const { Provider, Consumer } = createContext(null);

  function createDataProvider(mapData = v => v) {
    return class DataProvider extends Component {

      render() {
        const { children, ...props } = this.props;
        const data = mapData(props);
        if (!condition(data)) {
          return null;
        }
        return (
          <Provider value={data}>
            {children}
          </Provider>
        );
      }
    };
  }

  function withDataProvider(mapData = v => v) {
    return WrappedComponent => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name;

      return class DataProvider extends Component {
        static displayName = `DataProvider(${componentName})`;
        static WrappedComponent = WrappedComponent;

        render() {
          const data = mapData(this.props);
          if (!condition(data)) {
            return null;
          }
          return (
            <Provider value={data}>
              <WrappedComponent {...this.props} {...data} />
            </Provider>
          );
        }
      };
    };
  }

  function withData(WrappedComponent) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name;
    return class DataConsumer extends Component {
      static displayName = `DataConsumer(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render() {
        return (
          <Consumer>
            {data => condition(data) ? <WrappedComponent {...this.props} {...data} /> : null}
          </Consumer>
        );
      }
    };
  }

  return {
    createDataProvider,
    withDataProvider,
    withData,
  };

}

