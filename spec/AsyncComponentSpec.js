import AsyncComponent from '../src/AsyncComponent';
import TestComponent from './fixtures/TestComponent';

describe('AsyncComponent test suite', () => {

  it('test unresolved AsyncComponent', (done) => {
    render(<AsyncComponent
      component={() => import('./fixtures/TestComponent')}
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
      component={() => import('./fixtures/TestComponent')}
      onSuccess={() => done()}
    />);
  });

});