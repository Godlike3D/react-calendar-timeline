function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMarkersConsumer } from '../TimelineMarkersContext';
import { TimelineMarkerType } from '../markerType';

class CustomMarker extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date && this.getMarker) {
      const marker = this.getMarker();
      this.props.updateMarker({ ...marker,
        date: this.props.date
      });
    }
  }

  componentDidMount() {
    const {
      unsubscribe,
      getMarker
    } = this.props.subscribeMarker({
      type: TimelineMarkerType.Custom,
      renderer: this.props.children,
      date: this.props.date
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

  render() {
    return null;
  }

} // TODO: turn into HOC?


_defineProperty(CustomMarker, "propTypes", {
  subscribeMarker: PropTypes.func.isRequired,
  updateMarker: PropTypes.func.isRequired,
  children: PropTypes.func,
  date: PropTypes.number.isRequired
});

const CustomMarkerWrapper = props => {
  return /*#__PURE__*/React.createElement(TimelineMarkersConsumer, null, ({
    subscribeMarker,
    updateMarker
  }) => /*#__PURE__*/React.createElement(CustomMarker, _extends({
    subscribeMarker: subscribeMarker,
    updateMarker: updateMarker
  }, props)));
};

CustomMarkerWrapper.displayName = 'CustomMarkerWrapper';
export default CustomMarkerWrapper;