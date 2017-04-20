

import Await from '../src/Await';

function successTaskFactory(delay = 500) {
  return () => new Promise(resolve => setTimeout(resolve, delay, true));
}

function failTaskFactory(delay) {
  return () => new Promise((resolve, reject) => setTimeout(reject, delay, true));
}

describe('Await test suite', () => {
  it('test successTask', (done) => {
    const task = successTaskFactory();
    task().then(done);
  });

  it('test failTask', (done) => {
    const task = failTaskFactory();
    task()
            .then(() => expect(throwError('task successfully failed')).not.toThrowError())
            .catch(done);
  });

  it('Await should await success task', (done) => {
    const task = successTaskFactory();
    render(<Await
      renderComplete={() => <div />}
      renderPending={() => <div />}
      onStart={(resolve, reject) => {
        task()
                    .then(resolve)
                    .catch(reject);
      }}
      onSuccess={(value) => {
        expect(value).toBeTruthy();
        done();
      }}
      onError={(error) => {
        expect(throwError(`Await ${error} thrown`)).not.toThrowError();
      }}
      onCancel={() => {
        expect(throwError('Await unexpected task cancel')).not.toThrowError();
      }}
    />);
  });

  it('Await should await error task', (done) => {
    const task = failTaskFactory();
    render(<Await
      renderComplete={() => <div />}
      renderPending={() => <div />}
      onStart={(resolve, reject) => {
        task()
                    .then(resolve)
                    .catch(reject);
      }}
      onSuccess={() => {
        expect(false).toBeTruthy();
      }}
      onError={(value) => {
        expect(value).toBeTruthy();
        done();
      }}
      onCancel={() => {
        expect(false).toBeTruthy();
      }}
    />);
  });
  it('Await should cancel on umount', (done) => {
    const task = failTaskFactory(2000);
    render(<Await
      renderComplete={() => <div />}
      renderPending={() => <div />}
      onStart={(resolve, reject) => {
        task()
                    .then(resolve)
                    .catch(reject);
      }}
      onSuccess={() => {
        expect(true).toBeFalsy();
      }}
      onError={() => {
        expect(false).toBeTruthy();
      }}
      onCancel={(error) => {
        expect(error.isCanceled).toBeTruthy();
        done();
      }}
    />, (rootNode) => {
      const isUnmounted = unmountComponentAtNode(rootNode);
      expect(isUnmounted).toBeTruthy();
    });
  });
});
