'use strict';

import React, {Component, PropTypes} from 'react';

const {string} = PropTypes;

function formatComment(comment) {
    return comment.split('\n').map( line => `  * ${line}`).join('\n');
}

class Empty extends Component {
    static propTypes = {
        comment: string
    };
    static defaultProps = {
        comment: ''
    };
    render() {
        const {comment} = this.props;
        return <script dangerouslySetInnerHTML={{__html: `\n/**\n${formatComment(comment)}\n */`}} />;
    }
}

export default Empty;