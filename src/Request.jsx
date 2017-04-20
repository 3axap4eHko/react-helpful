import React, { PureComponent } from 'react';
import { any, string, object, func, bool } from 'prop-types';
import Await from './Await';
import { request } from './utils';

const xhrSymbol = Symbol('xhr');

class Request extends PureComponent {
  static propTypes = {
    id: any,

    url: string.isRequired,
    method: string,
    headers: object,
    query: object,
    data: string,
    withCredentials: bool,
    username: string,
    password: string,

    renderComplete: func.isRequired,
    renderPending: func.isRequired,

    onStart: func,
    onProgress: func,
    onSuccess: func,
    onError: func,
    onCancel: func,
  };
  static defaultProps = {
    method: 'GET',
    headers: {},
    data: null,
    withCredentials: true,
    onStart() {},
    onProgress() {},
    onSuccess() {},
    onError() {},
    onCancel() {},
  };

  onStart = (onSuccess, onError, id) => {
    const {
            url, method, query = {}, data = null, headers = {},
            withCredentials, username, password, onStart, onProgress,
          } = this.props;
    const options = {
      url,
      query,
      method,
      data,
      headers,
      username,
      password,
      withCredentials,

      onStart(xhr) {
        onStart(xhr, id);
      },
      onProgress(xhr) {
        onProgress(xhr, id);
      },
      onSuccess,
      onError,
    };
    this[xhrSymbol] = request(options);
  };
  onError = (error) => {
    this.props.onError(error, this[xhrSymbol], this.props.id);
  };
  onCancel = () => {
    if (this[xhrSymbol] !== XMLHttpRequest.DONE) {
      this[xhrSymbol].abort();
    }
    this.props.onCancel(this[xhrSymbol], this.props.id);
  };

  render() {
    const { id, renderComplete, renderPending, onSuccess } = this.props;
    return (
      <Await
        id={id}
        renderComplete={renderComplete}
        renderPending={renderPending}
        onStart={this.onStart}
        onSuccess={onSuccess}
        onError={this.onError}
        onCancel={this.onCancel}
      />
    );
  }
}

export default Request;
