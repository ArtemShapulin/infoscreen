import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import pickBy from 'lodash/pickBy';

import getCallbackByVector from 'utils/getCallbackByVector';
import checkMinDistance from 'utils/checkMinDistance';
import calculateMinDistance from 'utils/calculateMinDistance';

import {
  SWIPED_VECTOR, SWIPING_VECTOR, COEFFICIENT_X, COEFFICIENT_Y,
} from './constants';

const Swipeable = ({
  children,
  onSwipedDown,
  onSwipedUp,
  onSwipedRight,
  onSwipedLeft,
  onSwipingDown,
  onSwipingUp,
  onSwipingRight,
  onSwipingLeft,
  turnOnClick,
}) => {
  const [startSwipe, setStartSwipe] = useState(false);
  const [mousePressed, setMousePressed] = useState(false);
  const [dataVectors, setDataVectors] = useState({
    x1: null, x2: null, y1: null, y2: null,
  });
  const swipedCallbacks = {
    onSwipedDown,
    onSwipedUp,
    onSwipedRight,
    onSwipedLeft,
  };
  const swipingCallbacks = {
    onSwipingDown,
    onSwipingUp,
    onSwipingRight,
    onSwipingLeft,
  };

  const onElementTouchMove = (e) => {
    const nextDataVectors = {
      ...dataVectors,
      x2: e.screenX || e.touches[0].screenX,
      y2: e.screenY || e.touches[0].screenY,
    };
    const minDistance = calculateMinDistance({
      screenX: window.screen.availWidth, screenY: window.screen.availHeight, coefficientX: COEFFICIENT_X, coefficientY: COEFFICIENT_Y,
    });
    const isMinDistance = checkMinDistance({ ...minDistance, ...nextDataVectors });
    setDataVectors({ ...nextDataVectors });

    if (isMinDistance) {
      const { callback, vector } = getCallbackByVector({
        ...nextDataVectors,
        callbackNameSpace: SWIPING_VECTOR,
        callbacks: swipingCallbacks,
      });
      callback({ ...pickBy(nextDataVectors, (value, key) => key.replace(/[^a-z]/g, '') === vector) });
    }

    setStartSwipe(isMinDistance);
  };

  const onElementTouchStart = (e) => {
    setDataVectors({
      ...dataVectors,
      x1: e.screenX || e.touches[0].screenX,
      y1: e.screenY || e.touches[0].screenY,
    });
  };

  const onElementMousemove = (e) => {
    if (!mousePressed) return;
    const { screenX, screenY } = e;
    onElementTouchMove({ screenX, screenY });
  };

  const onElementTouchEnd = () => {
    if (startSwipe) {
      const { callback } = getCallbackByVector({
        ...dataVectors,
        callbackNameSpace: SWIPED_VECTOR,
        callbacks: swipedCallbacks,
      });
      callback();
    }
    setStartSwipe(false);
  };


  const onElementMouseDown = (e) => {
    if (!turnOnClick) return;
    const { screenX, screenY } = e;
    onElementTouchStart({ screenX, screenY });
    setMousePressed(true);
  };

  const onElementMouseUp = () => {
    if (!turnOnClick) return;
    onElementTouchEnd();
    setMousePressed(false);
  };

  return (
    <>
      {
        !isNil(children)
          ? (
            React.Children.map(children, (element) => (
              <div
                className="swipeable"
                draggable={false}
                onDragStart={(e) => { e.preventDefault(); }}
                onMouseUp={onElementMouseUp}
                onMouseMove={onElementMousemove}
                onMouseDown={onElementMouseDown}
                onTouchMove={onElementTouchMove}
                onTouchEnd={onElementTouchEnd}
                onTouchStart={onElementTouchStart}
              >
                {element}
              </div>
            ))
          )
          : null
    }
    </>
  );
};

Swipeable.propTypes = {
  onSwipedDown: PropTypes.func,
  onSwipedUp: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  turnOnClick: PropTypes.bool,
};

Swipeable.defaultProps = {
  onSwipedDown: () => {},
  onSwipedUp: () => {},
  onSwipedRight: () => {},
  onSwipedLeft: () => {},
  onSwipingDown: () => {},
  onSwipingUp: () => {},
  onSwipingRight: () => {},
  onSwipingLeft: () => {},
  turnOnClick: false,
};

export default Swipeable;
