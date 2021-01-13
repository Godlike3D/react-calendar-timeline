function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PreventClickOnDrag extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleMouseDown", evt => {
      this.originClickX = evt.clientX;
    });

    _defineProperty(this, "handleMouseUp", evt => {
      if (Math.abs(this.originClickX - evt.clientX) > this.props.clickTolerance) {
        this.cancelClick = true;
      }
    });

    _defineProperty(this, "handleClick", evt => {
      if (!this.cancelClick) {
        this.props.onClick(evt);
      }

      this.cancelClick = false;
      this.originClickX = null;
    });
  }

  render() {
    const childElement = React.Children.only(this.props.children);
    return /*#__PURE__*/React.cloneElement(childElement, {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick
    });
  }

}

_defineProperty(PreventClickOnDrag, "propTypes", {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  clickTolerance: PropTypes.number.isRequired
});

export default PreventClickOnDrag;