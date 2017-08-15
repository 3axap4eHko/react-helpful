import EventListener from '../src/EventListener';

const EVENT_NAME = 'testEvent';

describe('EventListener test suite', () => {
  it('EventListener be triggered by selector', (done) => {
    function Component(props) {

      return (
        <div id="target">
          <EventListener
            target={document}
            selector="#target"
            event={EVENT_NAME}
            on={props.onClick}
            once
          />
        </div>
      );
    }

    render(<Component onClick={done} />, () => {
      eventFire('#target', EVENT_NAME);
    });

  });
  it('EventListener can be triggered by global event', (done) => {
    function Component(props) {
      return (
        <EventListener
          target={document}
          event={EVENT_NAME}
          on={props.onClick}
          once
        />
      );
    }

    render(<Component onClick={done} />, () => {
      eventFire('body', EVENT_NAME);
    });
  });

  it('EventListener can be triggered by in window object', (done) => {
    function Component(props) {
      return (
        <EventListener
          target={window}
          event={EVENT_NAME}
          on={props.onClick}
          once
        />
      );
    }

    render(<Component onClick={done} />, () => {
      eventFire(window, EVENT_NAME);
    });
  });
});
