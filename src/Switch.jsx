'use strict';

import React, {Component, PropTypes} from 'react';
import Empty from './Empty';
import {isComponent} from './utils';

const {any, func, string, object, objectOf} = PropTypes;

class Switch extends Component {
    static propTypes = {
        value: any.isRequired,
        cases: objectOf(func).isRequired,
        def: func,
        props: object,
        comment: string
    };
    static defaultProps = {
        props: {}
    };

    render() {
        const {value, cases, def, props, comment} = this.props;
        const Component = value in cases ? cases[value] : def;

        if (isComponent(Component)) {
            return <Component {...props} />;
        }
        if (typeof Component === 'function') {
            return Component(props);
        }
        return <Empty comment={comment}/>;
    }
}

export default Switch;