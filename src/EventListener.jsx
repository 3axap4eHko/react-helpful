import React, { PureComponent } from 'react';
import { func, string, array, any, object, oneOfType } from 'prop-types';
import Empty from './Empty';

if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function matches(s) {
      const elements = (this.document || this.ownerDocument).querySelectorAll(s);
      let i = elements.length;
      while (i >= 0 && elements.item(i) !== this) {
        i += 1;
      }
      return i > -1;
    };
}

function isSelectorParent(element, selector) {
  return element.matches(`${selector}, ${selector} *`);
}

class EventListener extends PureComponent {
  static propTypes = {
    event: string.isRequired,
    target: object.isRequired,
    selector: string,
    excludeParents: array,
    on: func.isRequired,
    noPrevent: any,
    capture: any,
    once: any,
    passive: any,
  };

  constructor(props) {
    super(props);
    const { capture, once, passive } = props;
    this.state = {
      capture: !!capture,
      once: !!once,
      passive: !!passive,
    };
  }

  componentWillMount() {
    const { event, target } = this.props;
    if (target instanceof EventTarget) {
      target.addEventListener(event, this.listener, this.state);
    } else {
      throw new Error('EventListener target is not instance of EventTarget');
    }
  }

  componentWillUnmount() {
    const { event, target } = this.props;
    target.removeEventListener(event, this.listener, this.state);
  }

  listener = (event) => {
    const { selector, on, noPrevent, excludeParents = [] } = this.props;
    if (!selector || event.target.matches(selector)) {
      if (!noPrevent) {
        event.preventDefault();
      }
      const isExcluded = excludeParents.some(excludeSelector => isSelectorParent(event.target, excludeSelector));
      if (!isExcluded) {
        on(event);
      }
    }
  };

  render() {
    const { event, target } = this.props;
    return <Empty comment={`On ${target} ${event} listener`} />;
  }
}

export default EventListener;
