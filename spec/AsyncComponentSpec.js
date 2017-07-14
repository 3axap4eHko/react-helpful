import AsyncComponent from '../src/AsyncComponent';
import TestComponent from './fixtures/TestComponent';

function delay(component) {
  return new Promise(resolve => setInterval(resolve, 2000, component));
}

describe('AsyncComponent test suite', () => {

  it('test unresolved AsyncComponent with default loader', (done) => {
    render(<AsyncComponent
      component={() => import('./fixtures/TestComponent').then(delay)}
      onSuccess={() => done()}
    />);
  });
  it('test unresolved AsyncComponent', (done) => {
    render(<AsyncComponent
      component={() => import('./fixtures/TestComponent').then(delay)}
      loader={TestComponent}
      onSuccess={() => done()}
    />);
  });

  it('test resolved AsyncComponent', (done) => {
    render(<AsyncComponent
      component={() => require('./fixtures/TestComponent')}
      loader={TestComponent}
      onSuccess={() => done()}
    />);
  });

  it('test resolved AsyncComponent', (done) => {
    render(<AsyncComponent
      component={() => require('./fixtures/TestComponent').default}
      loader={TestComponent}
      onSuccess={() => done()}
    />);
  });

  it('test resolved AsyncComponent without loader', (done) => {
    render(<AsyncComponent
      component={() => import('./fixtures/TestComponent').then(delay)}
      onSuccess={() => done()}
    />);
  });

});