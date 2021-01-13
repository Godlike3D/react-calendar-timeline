function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreventClickOnDrag from '../interaction/PreventClickOnDrag';

class GroupRow extends Component {
  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group
    } = this.props;
    let classNamesForGroup = [];

    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group);
    }

    return /*#__PURE__*/React.createElement(PreventClickOnDrag, {
      clickTolerance: clickTolerance,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      onContextMenu: onContextMenu,
      onDoubleClick: onDoubleClick,
      className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''),
      style: style
    }));
  }

}

_defineProperty(GroupRow, "propTypes", {
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  isEvenRow: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  clickTolerance: PropTypes.number.isRequired,
  group: PropTypes.object.isRequired,
  horizontalLineClassNamesForGroup: PropTypes.func
});

export default GroupRow;