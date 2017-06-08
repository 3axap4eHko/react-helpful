import React, { PureComponent } from 'react';
import { any, func, arrayOf } from 'prop-types';
import Await from './Await';
import { PromiseCancelable } from './utils';

const CancelSymbol = Symbol('cancel');

function sequencer(actions, setCancel, results = []) {
  if (!actions.length) {
    return Promise.resolve(results);
  }
  const fn = actions.shift();
  const { promise, cancel } = PromiseCancelable((resolve, reject) => {
    fn().then(resolve).catch(reject);
  });
  setCancel(cancel);
  return promise.then(result => sequencer(actions, setCancel, [...results, result]));
}

class Sequencer extends PureComponent {
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

  static defaultProps = {
    onStart: () => null,
    onSuccess: () => null,
    onError: () => null,
    onCancel: () => null,
  };

  onStart = (resolve, reject, id) => {
    const { actions, onStart } = this.props;
    if (onStart) {
      onStart(resolve, reject, id);
    }
    sequencer(actions, cancel => (this[CancelSymbol] = cancel))
      .then(resolve)
      .catch(reject);
  };
  onCancel = (error, id) => {
    this[CancelSymbol](error, id);
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(error, id);
    }
  };

  render() {
    const { id, renderComplete, renderPending, onSuccess, onError } = this.props;
    return (
      <Await
        id={id}
        renderComplete={renderComplete}
        renderPending={renderPending}
        onStart={this.onStart}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={this.onCancel}
      />
    );
  }
}

export default Sequencer;
