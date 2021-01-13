function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Interval from './Interval';
export function CustomDateHeader({
  headerContext: {
    intervals,
    unit
  },
  getRootProps,
  getIntervalProps,
  showPeriod,
  data: {
    style,
    intervalRenderer,
    className,
    getLabelFormat,
    unitProp,
    headerData
  }
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-testid": `dateHeader`,
    className: className
  }, getRootProps({
    style
  })), intervals.map(interval => {
    const intervalText = getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth);
    return /*#__PURE__*/React.createElement(Interval, {
      key: `label-${interval.startTime.valueOf()}`,
      unit: unit,
      interval: interval,
      showPeriod: showPeriod,
      intervalText: intervalText,
      primaryHeader: unitProp === 'primaryHeader',
      getIntervalProps: getIntervalProps,
      intervalRenderer: intervalRenderer,
      headerData: headerData
    });
  }));
}