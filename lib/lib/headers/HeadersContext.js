function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import { noop } from '../utility/generic';
const defaultContextState = {
  registerScroll: () => {
    // eslint-disable-next-line
    console.warn('default registerScroll header used');
    return noop;
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150,
  timeSteps: {}
};
const {
  Consumer,
  Provider
} = createReactContext(defaultContextState);
export class TimelineHeadersProvider extends React.Component {
  render() {
    const contextValue = {
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth,
      timeSteps: this.props.timeSteps,
      registerScroll: this.props.registerScroll
    };
    return /*#__PURE__*/React.createElement(Provider, {
      value: contextValue
    }, this.props.children);
  }

}

_defineProperty(TimelineHeadersProvider, "propTypes", {
  children: PropTypes.element.isRequired,
  rightSidebarWidth: PropTypes.number,
  leftSidebarWidth: PropTypes.number.isRequired,
  //TODO: maybe this should be skipped?
  timeSteps: PropTypes.object.isRequired,
  registerScroll: PropTypes.func.isRequired
});

export const TimelineHeadersConsumer = Consumer;