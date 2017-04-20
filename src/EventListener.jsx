import React, { PureComponent } from 'react';
import { func, string, array, any } from 'prop-types';
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
  if (element.matches(selector)) {
    if (element.parentNode) {
      return isSelectorParent(element.parentNode, selector);
    }
    return false;
  }
  return true;
}

class EventListener extends PureComponent {
  static propTypes = {
    event: string.isRequired,
    target: string,
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
    const { event } = this.props;
    document.addEventListener(event, this.listener, this.state);
  }

  componentWillUnmount() {
    const { event } = this.props;
    document.removeEventListener(event, this.listener, this.state);
  }

  listener = (event) => {
    const { target, on, noPrevent, excludeParents = [] } = this.props;
    if (!target || event.target.matches(target)) {
      if (!noPrevent) {
        event.preventDefault();
      }
      const isExcluded = excludeParents.some(selector => isSelectorParent(event.target, selector));
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
