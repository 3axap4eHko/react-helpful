import React, { PureComponent } from 'react';
import { any, func, string, object, objectOf } from 'prop-types';
import Empty from './Empty';
import { isComponent } from './utils';

class Switch extends PureComponent {
  static propTypes = {
    value: any.isRequired,
    cases: objectOf(func).isRequired,
    def: func,
    props: object,
    comment: string,
  };
  static defaultProps = {
    props: {},
  };

  render() {
    const { value, cases, def, props, comment } = this.props;
    const Component = value in cases ? cases[value] : def;

    if (isComponent(Component)) {
      return <Component {...props} />;
    }
    if (typeof Component === 'function') {
      return Component(props);
    }
    if (typeof comment === 'string') {
      return <Empty comment={comment} />;
    }
    return null;
  }
}

export default Switch;
