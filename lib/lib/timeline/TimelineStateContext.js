function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import { calculateXPositionForTime, calculateTimeForXPosition } from '../utility/calendar';
/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */

const defaultContextState = {
  getTimelineState: () => {
    console.warn('"getTimelineState" default func is being used');
  },
  getLeftOffsetFromDate: () => {
    console.warn('"getLeftOffsetFromDate" default func is being used');
  },
  getDateFromLeftOffsetPosition: () => {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used');
  },
  showPeriod: () => {
    console.warn('"showPeriod" default func is being used');
  }
};
/* eslint-enable */

const {
  Consumer,
  Provider
} = createReactContext(defaultContextState);
export class TimelineStateProvider extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  constructor(props) {
    super(props);

    _defineProperty(this, "getTimelineState", () => {
      const {
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        timelineUnit,
        timelineWidth
      } = this.props;
      return {
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        timelineUnit,
        timelineWidth
      }; // REVIEW,
    });

    _defineProperty(this, "getLeftOffsetFromDate", date => {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth
      } = this.props;
      return calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, date);
    });

    _defineProperty(this, "getDateFromLeftOffsetPosition", leftOffset => {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth
      } = this.props;
      return calculateTimeForXPosition(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset);
    });

    this.state = {
      timelineContext: {
        getTimelineState: this.getTimelineState,
        getLeftOffsetFromDate: this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: this.getDateFromLeftOffsetPosition,
        showPeriod: this.props.showPeriod
      }
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(Provider, {
      value: this.state.timelineContext
    }, this.props.children);
  }

}

_defineProperty(TimelineStateProvider, "propTypes", {
  children: PropTypes.element.isRequired,
  visibleTimeStart: PropTypes.number.isRequired,
  visibleTimeEnd: PropTypes.number.isRequired,
  canvasTimeStart: PropTypes.number.isRequired,
  canvasTimeEnd: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  showPeriod: PropTypes.func.isRequired,
  timelineUnit: PropTypes.string.isRequired,
  timelineWidth: PropTypes.number.isRequired
});

export const TimelineStateConsumer = Consumer;