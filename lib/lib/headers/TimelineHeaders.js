function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import classNames from 'classnames';
import { TimelineHeadersConsumer } from './HeadersContext';
import PropTypes from 'prop-types';
import SidebarHeader from './SidebarHeader';
import { RIGHT_VARIANT } from './constants';

class TimelineHeaders extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getRootStyle", () => {
      return { ...this.props.style,
        display: 'flex',
        width: '100%'
      };
    });

    _defineProperty(this, "getCalendarHeaderStyle", () => {
      const {
        leftSidebarWidth,
        rightSidebarWidth,
        calendarHeaderStyle
      } = this.props;
      return { ...calendarHeaderStyle,
        overflow: 'hidden',
        width: `calc(100% - ${leftSidebarWidth + rightSidebarWidth}px)`
      };
    });

    _defineProperty(this, "handleRootRef", element => {
      if (this.props.headerRef) {
        this.props.headerRef(element);
      }
    });

    _defineProperty(this, "isSidebarHeader", child => {
      if (child.type === undefined) return false;
      return child.type.secretKey === SidebarHeader.secretKey;
    });
  }

  render() {
    let rightSidebarHeader;
    let leftSidebarHeader;
    let calendarHeaders = [];
    const children = Array.isArray(this.props.children) ? this.props.children.filter(c => c) : [this.props.children];
    React.Children.map(children, child => {
      if (this.isSidebarHeader(child)) {
        if (child.props.variant === RIGHT_VARIANT) {
          rightSidebarHeader = child;
        } else {
          leftSidebarHeader = child;
        }
      } else {
        calendarHeaders.push(child);
      }
    });

    if (!leftSidebarHeader) {
      leftSidebarHeader = /*#__PURE__*/React.createElement(SidebarHeader, null);
    }

    if (!rightSidebarHeader && this.props.rightSidebarWidth) {
      rightSidebarHeader = /*#__PURE__*/React.createElement(SidebarHeader, {
        variant: "right"
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      ref: this.handleRootRef,
      "data-testid": "headerRootDiv",
      style: this.getRootStyle(),
      className: classNames('rct-header-root', this.props.className)
    }, leftSidebarHeader, /*#__PURE__*/React.createElement("div", {
      ref: this.props.registerScroll,
      style: this.getCalendarHeaderStyle(),
      className: classNames('rct-calendar-header', this.props.calendarHeaderClassName),
      "data-testid": "headerContainer"
    }, calendarHeaders), rightSidebarHeader);
  }

}

_defineProperty(TimelineHeaders, "propTypes", {
  registerScroll: PropTypes.func.isRequired,
  leftSidebarWidth: PropTypes.number.isRequired,
  rightSidebarWidth: PropTypes.number.isRequired,
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  calendarHeaderStyle: PropTypes.object,
  calendarHeaderClassName: PropTypes.string,
  headerRef: PropTypes.func
});

const TimelineHeadersWrapper = ({
  children,
  style,
  className,
  calendarHeaderStyle,
  calendarHeaderClassName
}) => /*#__PURE__*/React.createElement(TimelineHeadersConsumer, null, ({
  leftSidebarWidth,
  rightSidebarWidth,
  registerScroll
}) => {
  return /*#__PURE__*/React.createElement(TimelineHeaders, {
    leftSidebarWidth: leftSidebarWidth,
    rightSidebarWidth: rightSidebarWidth,
    registerScroll: registerScroll,
    style: style,
    className: className,
    calendarHeaderStyle: calendarHeaderStyle,
    calendarHeaderClassName: calendarHeaderClassName
  }, children);
});

TimelineHeadersWrapper.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  calendarHeaderStyle: PropTypes.object,
  calendarHeaderClassName: PropTypes.string
};
TimelineHeadersWrapper.secretKey = "TimelineHeaders";
export default TimelineHeadersWrapper;