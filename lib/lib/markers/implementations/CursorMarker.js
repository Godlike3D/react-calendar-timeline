function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared';
import { MarkerCanvasConsumer } from '../MarkerCanvasContext';
const defaultRenderer = createDefaultRenderer('default-cursor-marker');
/**
 * CursorMarker implementation subscribes to 'subscribeToCanvasMouseOver' on mount.
 * This subscription is passed in via MarkerCanvasConsumer, which is wired up to
 * MarkerCanvasProvider in the MarkerCanvas component. When the user mouses over MarkerCanvas,
 * the callback registered in CursorMarker (this component) is passed:
 *  leftOffset - pixels from left edge of canvas, used to position this element
 *  date - the date the cursor pertains to
 *  isCursorOverCanvas - whether the user cursor is over the canvas. This is set to 'false'
 *  when the user mouseleaves the element
 */

class CursorMarker extends React.Component {
  constructor() {
    super();

    _defineProperty(this, "handleCanvasMouseOver", ({
      leftOffset,
      date,
      isCursorOverCanvas
    }) => {
      this.setState({
        leftOffset,
        date,
        isShowingCursor: isCursorOverCanvas
      });
    });

    this.state = {
      leftOffset: 0,
      date: 0,
      isShowingCursor: false
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeToCanvasMouseOver(this.handleCanvasMouseOver);
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  render() {
    const {
      isShowingCursor,
      leftOffset,
      date
    } = this.state;
    if (!isShowingCursor) return null;
    const styles = createMarkerStylesWithLeftOffset(leftOffset);
    return this.props.renderer({
      styles,
      date
    });
  }

} // TODO: turn into HOC?


_defineProperty(CursorMarker, "propTypes", {
  subscribeToCanvasMouseOver: PropTypes.func.isRequired,
  renderer: PropTypes.func
});

_defineProperty(CursorMarker, "defaultProps", {
  renderer: defaultRenderer
});

const CursorMarkerWrapper = props => {
  return /*#__PURE__*/React.createElement(MarkerCanvasConsumer, null, ({
    subscribeToMouseOver
  }) => {
    return /*#__PURE__*/React.createElement(CursorMarker, _extends({
      subscribeToCanvasMouseOver: subscribeToMouseOver
    }, props));
  });
};

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
export default CursorMarkerWrapper;