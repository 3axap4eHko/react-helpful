

import Request from '../src/Request';

const TAG_NAME_DIV = 'DIV';

describe('Request test suite', () => {
  it('Request should call onError if request is incorrect', (done) => {
    const requestUrl = 'http://url-does-not-exists';
    const component = render(<Request
      url={requestUrl}
      renderComplete={() => <div>Complete</div>}
      renderPending={() => <div>Pending</div>}
      onError={done}
    />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
  });

  it('Request should call onSuccess if request is correct', (done) => {
    const requestUrl = '/base/spec/data.json';
    const component = render(<Request
      url={requestUrl}
      headers={{ Test: 'Test' }}
      renderComplete={() => <div>Complete</div>}
      renderPending={() => <div>Pending</div>}
      onSuccess={(xhr) => {
        expect(xhr.status).toEqual(200);
        done();
      }}
      onError={() => {
        expect(throwError(`Url "${requestUrl}" not found`)).not.toThrowError();
        done();
      }}
    />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
  });

  it('Request should call onSuccess if request is correct', (done) => {
    const requestUrl = '/does-not-exist.json';
    const component = render(<Request
      url={requestUrl}
      headers={{ Test: 'Test' }}
      renderComplete={() => <div>Complete</div>}
      renderPending={() => <div>Pending</div>}
      onSuccess={() => {
        expect(throwError('Not existing url should throw an Error')).not.toThrowError();
        done();
      }}
      onError={(xhr) => {
        expect(xhr.status).toEqual(404);
        done();
      }}
    />);
    const node = findDOMNode(component);
    expect(node instanceof HTMLElement).toBeTruthy();
    expect(node.tagName).toEqual(TAG_NAME_DIV);
  });

  it('Request should call onStart before request proceed', (done) => {
    const requestUrl = 'http://url-does-not-exists';
    render(<Request
      url={requestUrl}
      headers={{ Test: 'Test' }}
      data="{}"
      renderComplete={() => <div>Complete</div>}
      renderPending={() => <div>Pending</div>}
      onStart={done}
      onSuccess={() => {
        expect(throwError('onStart was not called before request completion')).not.toThrowError();
        done();
      }}
    />);
  });
});
