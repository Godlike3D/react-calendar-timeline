function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMarkersConsumer } from '../TimelineMarkersContext';
import { TimelineMarkerType } from '../markerType';

class TodayMarker extends React.Component {
  componentDidMount() {
    const {
      unsubscribe,
      getMarker
    } = this.props.subscribeMarker({
      type: TimelineMarkerType.Today,
      renderer: this.props.children,
      interval: this.props.interval
    });
    this.unsubscribe = unsubscribe;
    this.getMarker = getMarker;
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interval !== this.props.interval && this.getMarker) {
      const marker = this.getMarker();
      this.props.updateMarker({ ...marker,
        interval: this.props.interval
      });
    }
  }

  render() {
    return null;
  }

} // TODO: turn into HOC?


_defineProperty(TodayMarker, "propTypes", {
  subscribeMarker: PropTypes.func.isRequired,
  updateMarker: PropTypes.func.isRequired,
  interval: PropTypes.number,
  children: PropTypes.func
});

_defineProperty(TodayMarker, "defaultProps", {
  interval: 1000 * 10 // default to ten seconds

});

const TodayMarkerWrapper = props => {
  return /*#__PURE__*/React.createElement(TimelineMarkersConsumer, null, ({
    subscribeMarker,
    updateMarker
  }) => /*#__PURE__*/React.createElement(TodayMarker, _extends({
    subscribeMarker: subscribeMarker,
    updateMarker: updateMarker
  }, props)));
};

TodayMarkerWrapper.displayName = 'TodayMarkerWrapper';
export default TodayMarkerWrapper;