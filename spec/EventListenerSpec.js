'use strict';

import EventListener from '../src/EventListener';

describe('EventListener test suite', () => {
    it('EventListener be triggered by selector', done => {
        const Component = React.createClass({
            render() {
                return <div id="target" ref="target">
                    <EventListener
                        target="#target"
                        event="click"
                        on={this.props.onClick}
                    />
                </div>
            }
        });
        const component = render(<Component onClick={done} />);
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        eventFire('#target', 'click');
    });
    it('EventListener can be triggered by global event', done => {
        const Component = React.createClass({
            render() {
                return <EventListener
                    event="click"
                    on={this.props.onClick}
                />;
            }
        });
        const component = render(<Component onClick={done} />);
        const node = findDOMNode(component);
        expect(node instanceof HTMLElement).toBeTruthy();
        eventFire('body', 'click');
    });
});