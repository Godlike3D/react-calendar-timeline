function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TimelineHeadersConsumer } from './HeadersContext';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
import { iterateTimes, calculateXPositionForTime } from '../utility/calendar';
export class CustomHeader extends React.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "getHeaderIntervals", ({
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeSteps,
      getLeftOffsetFromDate
    }) => {
      const intervals = [];
      iterateTimes(canvasTimeStart, canvasTimeEnd, unit, timeSteps, (startTime, endTime) => {
        const left = getLeftOffsetFromDate(startTime.valueOf());
        const right = getLeftOffsetFromDate(endTime.valueOf());
        const width = right - left;
        intervals.push({
          startTime,
          endTime,
          labelWidth: width,
          left
        });
      });
      return intervals;
    });

    _defineProperty(this, "getRootProps", (props = {}) => {
      const {
        style
      } = props;
      return {
        style: Object.assign({}, style ? style : {}, {
          position: 'relative',
          width: this.props.canvasWidth,
          height: this.props.height
        })
      };
    });

    _defineProperty(this, "getIntervalProps", (props = {}) => {
      const {
        interval,
        style
      } = props;
      if (!interval) throw new Error('you should provide interval to the prop getter');
      const {
        startTime,
        labelWidth,
        left
      } = interval;
      return {
        style: this.getIntervalStyle({
          style,
          startTime,
          labelWidth,
          canvasTimeStart: this.props.canvasTimeStart,
          unit: this.props.unit,
          left
        }),
        key: `label-${startTime.valueOf()}`
      };
    });

    _defineProperty(this, "getIntervalStyle", ({
      left,
      labelWidth,
      style
    }) => {
      return { ...style,
        left,
        width: labelWidth,
        position: 'absolute'
      };
    });

    _defineProperty(this, "getStateAndHelpers", () => {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        unit,
        showPeriod,
        timelineWidth,
        visibleTimeStart,
        visibleTimeEnd,
        headerData
      } = this.props; //TODO: only evaluate on changing params

      return {
        timelineContext: {
          timelineWidth,
          visibleTimeStart,
          visibleTimeEnd,
          canvasTimeStart,
          canvasTimeEnd
        },
        headerContext: {
          unit,
          intervals: this.state.intervals
        },
        getRootProps: this.getRootProps,
        getIntervalProps: this.getIntervalProps,
        showPeriod,
        data: headerData
      };
    });

    const {
      canvasTimeStart: _canvasTimeStart,
      canvasTimeEnd: _canvasTimeEnd,
      canvasWidth,
      unit: _unit,
      timeSteps: _timeSteps,
      showPeriod: _showPeriod,
      getLeftOffsetFromDate: _getLeftOffsetFromDate
    } = _props;

    const _intervals = this.getHeaderIntervals({
      canvasTimeStart: _canvasTimeStart,
      canvasTimeEnd: _canvasTimeEnd,
      canvasWidth,
      unit: _unit,
      timeSteps: _timeSteps,
      showPeriod: _showPeriod,
      getLeftOffsetFromDate: _getLeftOffsetFromDate
    });

    this.state = {
      intervals: _intervals
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod || nextProps.children !== this.props.children || nextProps.headerData !== this.props.headerData) {
      return true;
    }

    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod) {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeSteps,
        showPeriod,
        getLeftOffsetFromDate
      } = nextProps;
      const intervals = this.getHeaderIntervals({
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeSteps,
        showPeriod,
        getLeftOffsetFromDate
      });
      this.setState({
        intervals
      });
    }
  }

  render() {
    const props = this.getStateAndHelpers();
    const Renderer = this.props.children;
    return /*#__PURE__*/React.createElement(Renderer, props);
  }

}

_defineProperty(CustomHeader, "propTypes", {
  //component props
  children: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  //Timeline context
  timeSteps: PropTypes.object.isRequired,
  visibleTimeStart: PropTypes.number.isRequired,
  visibleTimeEnd: PropTypes.number.isRequired,
  canvasTimeStart: PropTypes.number.isRequired,
  canvasTimeEnd: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  showPeriod: PropTypes.func.isRequired,
  headerData: PropTypes.object,
  getLeftOffsetFromDate: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired
});

const CustomHeaderWrapper = ({
  children,
  unit,
  headerData,
  height
}) => /*#__PURE__*/React.createElement(TimelineStateConsumer, null, ({
  getTimelineState,
  showPeriod,
  getLeftOffsetFromDate
}) => {
  const timelineState = getTimelineState();
  return /*#__PURE__*/React.createElement(TimelineHeadersConsumer, null, ({
    timeSteps
  }) => /*#__PURE__*/React.createElement(CustomHeader, _extends({
    children: children,
    timeSteps: timeSteps,
    showPeriod: showPeriod,
    unit: unit ? unit : timelineState.timelineUnit
  }, timelineState, {
    headerData: headerData,
    getLeftOffsetFromDate: getLeftOffsetFromDate,
    height: height
  })));
});

CustomHeaderWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  unit: PropTypes.string,
  headerData: PropTypes.object,
  height: PropTypes.number
};
CustomHeaderWrapper.defaultProps = {
  height: 30
};
export default CustomHeaderWrapper;