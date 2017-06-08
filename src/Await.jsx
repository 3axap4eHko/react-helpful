import React, { PureComponent } from 'react';
import { number, oneOfType, func, string } from 'prop-types';
import If from './If';
import { PromiseCancelable } from './utils';

const cancelSymbol = Symbol('cancel');

function getPromiseCancelable(onStart, onSuccess, onError) {
  const result = PromiseCancelable((resolve, reject) => onStart(resolve, reject));
  result.promise
    .then(onSuccess)
    .catch(onError);
  return result;
}

class Await extends PureComponent {

  static propTypes = {
    id: oneOfType([string, number]),

    renderComplete: func.isRequired,
    renderPending: func.isRequired,

    onStart: func.isRequired,
    onSuccess: func,
    onError: func,
    onCancel: func,

    comment: string,
  };

  static defaultProps = {
    onSuccess: () => null,
    onError: () => null,
    onCancel: () => null,
  };

  componentWillMount() {
    const { cancel } = getPromiseCancelable(this.onStart, this.onSuccess, this.onError);
    this[cancelSymbol] = cancel;
  }

  componentWillUnmount() {
    this[cancelSymbol](null, this.props.id);
  }

  onStart = (resolve, reject) => {
    const { id, onStart } = this.props;
    if (onStart) {
      onStart(resolve, reject, id);
    }
    this.setState({ done: false });
  };
  onSuccess = (value) => {
    const { id, onSuccess } = this.props;
    if (onSuccess) {
      onSuccess(value, id);
    }
    this.setState({ value, done: true });
  };
  onError = (error) => {
    if (!error || !error.isCanceled) {
      const { id, onError } = this.props;
      if (onError) {
        onError(error, id);
      }
      this.setState({ error, done: true });
    } else {
      const { id, onCancel } = this.props;
      if (onCancel) {
        onCancel(error, id);
      }
    }
  };

  render() {
    const { done, value, error } = this.state;
    const { renderComplete, renderPending, comment, id } = this.props;
    return (
      <If
        is={done}
        props={{ error, value, id }}
        render={renderComplete}
        elseRender={renderPending}
        comment={comment}
      />
    );
  }
}

export default Await;
