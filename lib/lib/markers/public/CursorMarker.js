function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMarkersConsumer } from '../TimelineMarkersContext';
import { TimelineMarkerType } from '../markerType';

class CursorMarker extends React.Component {
  componentDidMount() {
    const {
      unsubscribe
    } = this.props.subscribeMarker({
      type: TimelineMarkerType.Cursor,
      renderer: this.props.children
    });
    this.unsubscribe = unsubscribe;
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


_defineProperty(CursorMarker, "propTypes", {
  subscribeMarker: PropTypes.func.isRequired,
  children: PropTypes.func
});

const CursorMarkerWrapper = props => {
  return /*#__PURE__*/React.createElement(TimelineMarkersConsumer, null, ({
    subscribeMarker
  }) => /*#__PURE__*/React.createElement(CursorMarker, _extends({
    subscribeMarker: subscribeMarker
  }, props)));
};

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
export default CursorMarkerWrapper;