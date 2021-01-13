function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { getNextUnit } from '../utility/calendar';
import { composeEvents } from '../utility/events';

class Interval extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onIntervalClick", () => {
      const {
        primaryHeader,
        interval,
        unit,
        showPeriod
      } = this.props;

      if (primaryHeader) {
        const nextUnit = getNextUnit(unit);
        const newStartTime = interval.startTime.clone().startOf(nextUnit);
        const newEndTime = interval.startTime.clone().endOf(nextUnit);
        showPeriod(newStartTime, newEndTime);
      } else {
        showPeriod(interval.startTime, interval.endTime);
      }
    });

    _defineProperty(this, "getIntervalProps", (props = {}) => {
      return { ...this.props.getIntervalProps({
          interval: this.props.interval,
          ...props
        }),
        onClick: composeEvents(this.onIntervalClick, props.onClick)
      };
    });
  }

  render() {
    const {
      intervalText,
      interval,
      intervalRenderer,
      headerData
    } = this.props;
    const Renderer = intervalRenderer;

    if (Renderer) {
      return /*#__PURE__*/React.createElement(Renderer, {
        getIntervalProps: this.getIntervalProps,
        intervalContext: {
          interval,
          intervalText
        },
        data: headerData
      });
    }

    return /*#__PURE__*/React.createElement("div", _extends({
      "data-testid": "dateHeaderInterval"
    }, this.getIntervalProps({}), {
      className: `rct-dateHeader ${this.props.primaryHeader ? 'rct-dateHeader-primary' : ''}`
    }), /*#__PURE__*/React.createElement("span", null, intervalText));
  }

}

_defineProperty(Interval, "propTypes", {
  intervalRenderer: PropTypes.func,
  unit: PropTypes.string.isRequired,
  interval: PropTypes.object.isRequired,
  showPeriod: PropTypes.func.isRequired,
  intervalText: PropTypes.string.isRequired,
  primaryHeader: PropTypes.bool.isRequired,
  getIntervalProps: PropTypes.func.isRequired,
  headerData: PropTypes.object
});

export default Interval;