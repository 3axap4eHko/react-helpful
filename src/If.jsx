import React, { PureComponent } from 'react';
import { func, any, shape, string } from 'prop-types';
import Empty from './Empty';
import { isComponent } from './utils';

class If extends PureComponent {
  static propTypes = {
    is: any.isRequired,

    render: func.isRequired,
    elseRender: func,

    props: shape({}),
    comment: string,
  };
  static defaultProps = {
    props: {},
  };

  render() {
    const { is, render, elseRender, props, comment } = this.props;
    const Component = is ? render : elseRender;

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

export default If;
