import EventListener from '../src/EventListener';

describe('EventListener test suite', () => {
  it('EventListener be triggered by selector', (done) => {
    function Component(props) {

      return (
        <div id="target">
          <EventListener
            target="#target"
            event="click"
            on={props.onClick}
          />
        </div>
      );
    }

    render(<Component onClick={done} />);
    eventFire('#target', 'click');
  });
  it('EventListener can be triggered by global event', (done) => {
    function Component(props) {
      return (
        <EventListener
          event="click"
          on={props.onClick}
        />
      );
    }

    render(<Component onClick={done} />);
    eventFire('body', 'click');
  });
});
