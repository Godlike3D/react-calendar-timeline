function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import { noop } from '../utility/generic';
const defaultContextState = {
  markers: [],
  subscribeMarker: () => {
    // eslint-disable-next-line
    console.warn('default subscribe marker used');
    return noop;
  }
};
const {
  Consumer,
  Provider
} = createReactContext(defaultContextState); // REVIEW: is this the best way to manage ids?

let _id = 0;

const createId = () => {
  _id += 1;
  return _id + 1;
};

export class TimelineMarkersProvider extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSubscribeToMarker", newMarker => {
      newMarker = { ...newMarker,
        // REVIEW: in the event that we accept id to be passed to the Marker components, this line would override those
        id: createId()
      };
      this.setState(state => {
        return {
          markers: [...state.markers, newMarker]
        };
      });
      return {
        unsubscribe: () => {
          this.setState(state => {
            return {
              markers: state.markers.filter(marker => marker.id !== newMarker.id)
            };
          });
        },
        getMarker: () => {
          return newMarker;
        }
      };
    });

    _defineProperty(this, "handleUpdateMarker", updateMarker => {
      const markerIndex = this.state.markers.findIndex(marker => marker.id === updateMarker.id);
      if (markerIndex < 0) return;
      this.setState(state => {
        return {
          markers: [...state.markers.slice(0, markerIndex), updateMarker, ...state.markers.slice(markerIndex + 1)]
        };
      });
    });

    _defineProperty(this, "state", {
      markers: [],
      subscribeMarker: this.handleSubscribeToMarker,
      updateMarker: this.handleUpdateMarker
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(Provider, {
      value: this.state
    }, this.props.children);
  }

}

_defineProperty(TimelineMarkersProvider, "propTypes", {
  children: PropTypes.element.isRequired
});

export const TimelineMarkersConsumer = Consumer;