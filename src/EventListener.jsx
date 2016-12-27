'use strict';

import React, {Component, PropTypes} from 'react';
import Empty from './Empty';

if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(s);
            let i = matches.length;
            while (--i >= 0 && matches.item(i) !== this);
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

const {func, string, array, any} = PropTypes;

class EventListener extends Component {
    static propTypes = {
        event: string.isRequired,
        target: string,
        excludeParents: array,
        on: func.isRequired,
        noPrevent: any,
        capture: any,
        once: any,
        passive: any
    };

    constructor(props) {
        super(props);
        const {capture, once, passive} = props;
        this.state = {
            capture: !!capture,
            once: !!once,
            passive: !!passive
        };
    }

    componentWillMount() {
        const {event} = this.props;
        document.addEventListener(event, this.listener, this.state);
    }

    componentWillUnmount() {
        const {event} = this.props;
        document.removeEventListener(event, this.listener, this.state);
    }

    listener = (event) => {
        const {target, on, noPrevent, excludeParents = []} = this.props;
        if (!target || event.target.matches(target)) {
            if (!noPrevent) {
                event.preventDefault();
            }
            const isExcluded = excludeParents.some( selector => isSelectorParent(event.target, selector));
            if (!isExcluded) {
                on(event);
            }
        }
    };

    render() {
        const {event, target} = this.props;
        return <Empty comment={`On ${target} ${event} listener`}/>;
    }
}

export default EventListener;