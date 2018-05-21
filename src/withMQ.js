import React, { Component } from 'react';
import { object } from 'prop-types';
import createHOC from './createHOC';

const hasWindow = typeof window !== 'undefined';

function createMediaQueryList([name, query]) {

  const isString = typeof query === 'string';
  const { mediaQuery, matches } = (isString ? { mediaQuery: query, matches: false } : query);
  if (hasWindow) {
    const mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.name = name;
    return mediaQueryList;
  } else {
    return { matches, name };
  }
}

export default createHOC(mediaQueries => class MediaQuery extends Component {

  static mediaQueryLists = Object.entries(mediaQueries).map(createMediaQueryList);

  static getDerivedStateFromProps() {
    const matches = {};
    MediaQuery.mediaQueryLists.forEach(({ name, matches }) => matches[name] = matches);

    return {
      matches,
    };
  }

  state = {};
  unsubscribe = [];

  onMediaQuery = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.matches });
  };

  componentDidMount() {
    MediaQuery.mediaQueryLists.forEach(mediaQueryList => {
      mediaQueryList.addListener(this.onMediaQuery);
      this.unsubscribe.push(() => mediaQueryList.removeListener(this.onMediaQuery));
    });
  }

  componentWillUnmount() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe());
  }

  render() {
    return <MediaQuery.WrappedComponent {...this.props} {...this.state} />;
  }
});
