function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { MarkerCanvasProvider } from './MarkerCanvasContext';
import TimelineMarkersRenderer from './TimelineMarkersRenderer';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'; // expand to fill entire parent container (ScrollElement)

const staticStyles = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
/**
 * Renders registered markers and exposes a mouse over listener for
 * CursorMarkers to subscribe to
 */

class MarkerCanvas extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleMouseMove", evt => {
      if (this.subscription != null) {
        const {
          pageX
        } = evt; // FIXME: dont use getBoundingClientRect. Use passed in scroll amount

        const {
          left: containerLeft
        } = this.containerEl.getBoundingClientRect(); // number of pixels from left we are on canvas
        // we do this calculation as pageX is based on x from viewport whereas
        // our canvas can be scrolled left and right and is generally outside
        // of the viewport.  This calculation is to get how many pixels the cursor
        // is from left of this element

        const canvasX = pageX - containerLeft;
        const date = this.props.getDateFromLeftOffsetPosition(canvasX);
        this.subscription({
          leftOffset: canvasX,
          date,
          isCursorOverCanvas: true
        });
      }
    });

    _defineProperty(this, "handleMouseLeave", () => {
      if (this.subscription != null) {
        // tell subscriber that we're not on canvas
        this.subscription({
          leftOffset: 0,
          date: 0,
          isCursorOverCanvas: false
        });
      }
    });

    _defineProperty(this, "handleMouseMoveSubscribe", sub => {
      this.subscription = sub;
      return () => {
        this.subscription = null;
      };
    });

    _defineProperty(this, "state", {
      subscribeToMouseOver: this.handleMouseMoveSubscribe
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(MarkerCanvasProvider, {
      value: this.state
    }, /*#__PURE__*/React.createElement("div", {
      style: staticStyles,
      onMouseMove: this.handleMouseMove,
      onMouseLeave: this.handleMouseLeave,
      ref: el => this.containerEl = el
    }, /*#__PURE__*/React.createElement(TimelineMarkersRenderer, null), this.props.children));
  }

}

_defineProperty(MarkerCanvas, "propTypes", {
  getDateFromLeftOffsetPosition: PropTypes.func.isRequired,
  children: PropTypes.node
});

const MarkerCanvasWrapper = props => /*#__PURE__*/React.createElement(TimelineStateConsumer, null, ({
  getDateFromLeftOffsetPosition
}) => /*#__PURE__*/React.createElement(MarkerCanvas, _extends({
  getDateFromLeftOffsetPosition: getDateFromLeftOffsetPosition
}, props)));

export default MarkerCanvasWrapper;