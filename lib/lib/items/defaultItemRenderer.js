import React from 'react';
import PropTypes from 'prop-types';
export const defaultItemRenderer = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps
}) => {
  const {
    left: leftResizeProps,
    right: rightResizeProps
  } = getResizeProps();
  return /*#__PURE__*/React.createElement("div", getItemProps(item.itemProps), itemContext.useResizeHandle ? /*#__PURE__*/React.createElement("div", leftResizeProps) : '', /*#__PURE__*/React.createElement("div", {
    className: "rct-item-content",
    style: {
      maxHeight: `${itemContext.dimensions.height}`
    }
  }, itemContext.title), itemContext.useResizeHandle ? /*#__PURE__*/React.createElement("div", rightResizeProps) : '');
}; // TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.

defaultItemRenderer.propTypes = {
  item: PropTypes.any,
  itemContext: PropTypes.any,
  getItemProps: PropTypes.any,
  getResizeProps: PropTypes.any
};