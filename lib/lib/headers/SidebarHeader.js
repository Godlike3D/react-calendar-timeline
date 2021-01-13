function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { TimelineHeadersConsumer } from './HeadersContext';
import { LEFT_VARIANT, RIGHT_VARIANT } from './constants';

class SidebarHeader extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getRootProps", (props = {}) => {
      const {
        style
      } = props;
      const width = this.props.variant === RIGHT_VARIANT ? this.props.rightSidebarWidth : this.props.leftSidebarWidth;
      return {
        style: { ...style,
          width
        }
      };
    });

    _defineProperty(this, "getStateAndHelpers", () => {
      return {
        getRootProps: this.getRootProps,
        data: this.props.headerData
      };
    });
  }

  render() {
    const props = this.getStateAndHelpers();
    const Renderer = this.props.children;
    return /*#__PURE__*/React.createElement(Renderer, props);
  }

}

_defineProperty(SidebarHeader, "propTypes", {
  children: PropTypes.func.isRequired,
  rightSidebarWidth: PropTypes.number,
  leftSidebarWidth: PropTypes.number.isRequired,
  variant: PropTypes.string,
  headerData: PropTypes.object
});

const SidebarWrapper = ({
  children,
  variant,
  headerData
}) => /*#__PURE__*/React.createElement(TimelineHeadersConsumer, null, ({
  leftSidebarWidth,
  rightSidebarWidth
}) => {
  return /*#__PURE__*/React.createElement(SidebarHeader, {
    leftSidebarWidth: leftSidebarWidth,
    rightSidebarWidth: rightSidebarWidth,
    children: children,
    variant: variant,
    headerData: headerData
  });
});

SidebarWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  variant: PropTypes.string,
  headerData: PropTypes.object
};
SidebarWrapper.defaultProps = {
  variant: LEFT_VARIANT,
  children: ({
    getRootProps
  }) => /*#__PURE__*/React.createElement("div", _extends({
    "data-testid": "sidebarHeader"
  }, getRootProps()))
};
SidebarWrapper.secretKey = "SidebarHeader";
export default SidebarWrapper;