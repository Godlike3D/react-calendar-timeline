function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
import CustomHeader from './CustomHeader';
import { getNextUnit } from '../utility/calendar';
import { defaultHeaderFormats } from '../default-config';
import memoize from 'memoize-one';
import { CustomDateHeader } from './CustomDateHeader';

class DateHeader extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getHeaderUnit", () => {
      if (this.props.unit === 'primaryHeader') {
        return getNextUnit(this.props.timelineUnit);
      } else if (this.props.unit) {
        return this.props.unit;
      }

      return this.props.timelineUnit;
    });

    _defineProperty(this, "getRootStyle", memoize(style => {
      return {
        height: 30,
        ...style
      };
    }));

    _defineProperty(this, "getLabelFormat", (interval, unit, labelWidth) => {
      const {
        labelFormat
      } = this.props;

      if (typeof labelFormat === 'string') {
        const startTime = interval[0];
        return startTime.format(labelFormat);
      } else if (typeof labelFormat === 'function') {
        return labelFormat(interval, unit, labelWidth);
      } else {
        throw new Error('labelFormat should be function or string');
      }
    });

    _defineProperty(this, "getHeaderData", memoize((intervalRenderer, style, className, getLabelFormat, unitProp, headerData) => {
      return {
        intervalRenderer,
        style,
        className,
        getLabelFormat,
        unitProp,
        headerData
      };
    }));
  }

  render() {
    const unit = this.getHeaderUnit();
    const {
      headerData,
      height
    } = this.props;
    return /*#__PURE__*/React.createElement(CustomHeader, {
      unit: unit,
      height: height,
      headerData: this.getHeaderData(this.props.intervalRenderer, this.getRootStyle(this.props.style), this.props.className, this.getLabelFormat, this.props.unit, this.props.headerData),
      children: CustomDateHeader
    });
  }

}

_defineProperty(DateHeader, "propTypes", {
  unit: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  timelineUnit: PropTypes.string,
  labelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)), PropTypes.string]).isRequired,
  intervalRenderer: PropTypes.func,
  headerData: PropTypes.object,
  height: PropTypes.number
});

const DateHeaderWrapper = ({
  unit,
  labelFormat,
  style,
  className,
  intervalRenderer,
  headerData,
  height
}) => /*#__PURE__*/React.createElement(TimelineStateConsumer, null, ({
  getTimelineState
}) => {
  const timelineState = getTimelineState();
  return /*#__PURE__*/React.createElement(DateHeader, {
    timelineUnit: timelineState.timelineUnit,
    unit: unit,
    labelFormat: labelFormat,
    style: style,
    className: className,
    intervalRenderer: intervalRenderer,
    headerData: headerData,
    height: height
  });
});

DateHeaderWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  unit: PropTypes.string,
  labelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)), PropTypes.string]),
  intervalRenderer: PropTypes.func,
  headerData: PropTypes.object,
  height: PropTypes.number
};
DateHeaderWrapper.defaultProps = {
  labelFormat: formatLabel
};

function formatLabel([timeStart, timeEnd], unit, labelWidth, formatOptions = defaultHeaderFormats) {
  let format;

  if (labelWidth >= 150) {
    format = formatOptions[unit]['long'];
  } else if (labelWidth >= 100) {
    format = formatOptions[unit]['mediumLong'];
  } else if (labelWidth >= 50) {
    format = formatOptions[unit]['medium'];
  } else {
    format = formatOptions[unit]['short'];
  }

  return timeStart.format(format);
}

export default DateHeaderWrapper;