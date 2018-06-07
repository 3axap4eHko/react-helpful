import React, { Component } from 'react';
import { func, string, array, any, shape, oneOfType } from 'prop-types';

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

export default class EventListener extends Component {
  static propTypes = {
    event: string.isRequired,
    target: func.isRequired,
    selector: string,
    excludeParents: array,
    on: func.isRequired,
    prevent: any,
    capture: any,
    once: any,
    passive: any,
  };

  static defaultProps = {
    target: () => document,
  };

  static getDerivedStateFromProps({ capture, once, passive }) {
    return {
      capture: !!capture,
      once: !!once,
      passive: !!passive,
    };
  }

  state ={};

  componentDidMount() {
    const { event, target } = this.props;
    target().addEventListener(event, this.listener, this.state);
  }

  componentWillUnmount() {
    const { event, target } = this.props;
    target().removeEventListener(event, this.listener, this.state);
  }

  listener = (event) => {
    const { selector, on, prevent, excludeParents = [] } = this.props;
    if (!selector || event.target.matches(selector)) {
      if (prevent) {
        event.preventDefault();
      }
      const isExcluded = excludeParents.some(excludeSelector => isSelectorParent(event.target, excludeSelector));
      if (!isExcluded) {
        on(event);
      }
    }
  };

  render() {
    return null;
  }
}
