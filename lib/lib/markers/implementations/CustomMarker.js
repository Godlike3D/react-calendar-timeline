function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared';
const defaultCustomMarkerRenderer = createDefaultRenderer('default-customer-marker-id');
/**
 * CustomMarker that is placed based on passed in date prop
 */

class CustomMarker extends React.Component {
  render() {
    const {
      date
    } = this.props;
    const leftOffset = this.props.getLeftOffsetFromDate(date);
    const styles = createMarkerStylesWithLeftOffset(leftOffset);
    return this.props.renderer({
      styles,
      date
    });
  }

}

_defineProperty(CustomMarker, "propTypes", {
  getLeftOffsetFromDate: PropTypes.func.isRequired,
  renderer: PropTypes.func,
  date: PropTypes.number.isRequired
});

_defineProperty(CustomMarker, "defaultProps", {
  renderer: defaultCustomMarkerRenderer
});

export default CustomMarker;