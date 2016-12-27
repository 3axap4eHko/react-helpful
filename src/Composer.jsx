'use strict';

import React, {Component, PropTypes} from 'react';
import Await from './Await';

const {func, arrayOf} = PropTypes;

class Composer extends Component {
    static propTypes = {
        actions: arrayOf(func).isRequired,

        renderComplete: func.isRequired,
        renderPending: func.isRequired,

        onStart: func,
        onSuccess: func,
        onError: func,
        onCancel: func,
    };
    onStart = (resolve, reject) => {
        const {actions, onStart} = this.props;
        if (onStart) {
            onStart(resolve, reject);
        }
        Promise
            .all(actions.map(action => action()))
            .then(resolve)
            .catch(reject);
    };
    render() {
        const {renderComplete, renderPending, onSuccess, onError, onCancel} = this.props;
        return <Await
            renderComplete={renderComplete}
            renderPending={renderPending}
            onStart={this.onStart}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
        />;
    }
}

export default Composer;