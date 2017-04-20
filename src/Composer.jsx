import React, { PureComponent } from 'react';
import { func, arrayOf, any } from 'prop-types';
import Await from './Await';

class Composer extends PureComponent {

  static propTypes = {
    id: any,

    actions: arrayOf(func).isRequired,

    renderComplete: func.isRequired,
    renderPending: func.isRequired,

    onStart: func,
    onSuccess: func,
    onError: func,
    onCancel: func,
  };
  onStart = (resolve, reject, id) => {
    const { actions, onStart } = this.props;
    if (onStart) {
      onStart(resolve, reject, id);
    }
    Promise
      .all(actions.map(action => action()))
      .then(resolve)
      .catch(reject);
  };

  render() {
    const { id, renderComplete, renderPending, onSuccess, onError, onCancel } = this.props;
    return (
      <Await
        id={id}
        renderComplete={renderComplete}
        renderPending={renderPending}
        onStart={this.onStart}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    );
  }
}

export default Composer;
