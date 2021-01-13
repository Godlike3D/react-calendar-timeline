function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { iterateTimes } from '../utility/calendar';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
const passThroughPropTypes = {
  canvasTimeStart: PropTypes.number.isRequired,
  canvasTimeEnd: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  lineCount: PropTypes.number.isRequired,
  minUnit: PropTypes.string.isRequired,
  timeSteps: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  verticalLineClassNamesForTime: PropTypes.func
};

class Columns extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.height === this.props.height && nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime);
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      minUnit,
      timeSteps,
      height,
      verticalLineClassNamesForTime,
      getLeftOffsetFromDate
    } = this.props;
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
    let lines = [];
    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, (time, nextTime) => {
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
      let classNamesForTime = [];

      if (verticalLineClassNamesForTime) {
        classNamesForTime = verticalLineClassNamesForTime(time.unix() * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
        nextTime.unix() * 1000 - 1);
      } // TODO: rename or remove class that has reference to vertical-line


      const classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ` rct-day-${time.day()} ` : '') + classNamesForTime.join(' ');
      const left = getLeftOffsetFromDate(time.valueOf());
      const right = getLeftOffsetFromDate(nextTime.valueOf());
      lines.push( /*#__PURE__*/React.createElement("div", {
        key: `line-${time.valueOf()}`,
        className: classNames,
        style: {
          pointerEvents: 'none',
          top: '0px',
          left: `${left}px`,
          width: `${right - left}px`,
          height: `${height}px`
        }
      }));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "rct-vertical-lines"
    }, lines);
  }

}

_defineProperty(Columns, "propTypes", { ...passThroughPropTypes,
  getLeftOffsetFromDate: PropTypes.func.isRequired
});

const ColumnsWrapper = ({ ...props
}) => {
  return /*#__PURE__*/React.createElement(TimelineStateConsumer, null, ({
    getLeftOffsetFromDate
  }) => /*#__PURE__*/React.createElement(Columns, _extends({
    getLeftOffsetFromDate: getLeftOffsetFromDate
  }, props)));
};

ColumnsWrapper.defaultProps = { ...passThroughPropTypes
};
export default ColumnsWrapper;