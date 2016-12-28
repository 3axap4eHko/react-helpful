'use strict';

import React, {Component, PropTypes} from 'react';
import Empty from './Empty';
import {isComponent} from './utils';

const {func, any, object, string} = PropTypes;

class If extends Component {
    static propTypes = {
        is: any,

        render: func.isRequired,
        elseRender: func,

        props: object,
        comment: string
    };
    static defaultProps = {
        props: {}
    };

    render() {
        const {is, render, elseRender, props, comment} = this.props;
        const Component = is ? render : elseRender;

        if (isComponent(Component)) {
            return <Component {...props} />;
        }
        if (typeof Component === 'function') {
            return Component(props);
        }
        if (typeof comment === 'string') {
            return <Empty comment={comment}/>;
        }
        return null;
    }
}

export default If;