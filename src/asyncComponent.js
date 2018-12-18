import React, { Component } from 'react';
import { func, element } from 'prop-types';

const components = new WeakMap();

const esModuleFlag = '__esModule';

async function loadComponent(component, componentLoader, callback) {
  components.set(componentLoader, null);
  const result = await componentLoader();
  const DynamicComponent = result && result[esModuleFlag] ? result.default : result;
  components.set(componentLoader, DynamicComponent);
  if (!component.__unmounted) {
    component.WrappedComponent = DynamicComponent;
    component.setState({ DynamicComponent });
  }
  callback(DynamicComponent);
}

export default function (componentLoader, options = {}) {

  const {
          loader = () => null,
          onLoad = () => {},
        } = options;

  return class AsyncComponent extends Component {

    static getDerivedStateFromProps(props, { self }) {
      if (!components.has(componentLoader)) {
        loadComponent(self, componentLoader, onLoad);

        return { DynamicComponent: null };
      }
      const DynamicComponent = components.get(componentLoader);
      if (DynamicComponent) {
        return { DynamicComponent };
      }
      return null;
    }

    state = {
      self: this,
      DynamicComponent: null,
    };

    componentWillUnmount() {
      this.__unmounted = true;
    }

    render() {
      const { DynamicComponent } = this.state;
      if (DynamicComponent) {
        return <DynamicComponent {...this.props} />;
      }
      return loader(this.props);
    }
  };
}