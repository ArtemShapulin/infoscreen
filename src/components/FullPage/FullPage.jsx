import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import take from 'lodash/take';
import map from 'lodash/map';

import Swipeable from 'components/Swipeable/Swipeable';

import EMPTY_CLASS from 'globalConstants/common';
import { BODY_HIDDEN_SCROLL, FULL_PAGE_BLOCK_TARGET } from './constants';

import './style.scss';

const FullPage = ({ children, onChangeTargetSection }) => {
  const containerRef = useRef(null);
  const [indexTargetSection, setIndexTargetSection] = useState(0);
  const [translateYValue, setTranslateYValue] = useState(0);

  const calculateClientHeightElementsSum = () => {
    const sections = containerRef.current.children;
    let sum = 0;
    map(take(sections, indexTargetSection), (element) => {
      sum += element.clientHeight;
    });
    return -sum;
  };

  const changeTargetSection = ({ sections, isTopScrolling }) => {
    if ((indexTargetSection === sections.length - 1 && !isTopScrolling) || (!indexTargetSection && isTopScrolling)) {
      return;
    }

    setIndexTargetSection(isTopScrolling ? indexTargetSection - 1 : indexTargetSection + 1);

    const { clientHeight } = sections[indexTargetSection];
    const newTranslateYValue = isTopScrolling ? translateYValue + clientHeight : translateYValue - clientHeight;

    setTranslateYValue(newTranslateYValue);
    onChangeTargetSection({ targetIndex: indexTargetSection, targetRef: sections[indexTargetSection] });
  };

  const onWheelScroll = (e) => {
    const isTopScrolling = translateYValue - parseInt(e.deltaY) > translateYValue;
    changeTargetSection({ sections: containerRef.current.children, isTopScrolling });
    e.stopPropagation();
  };

  useEffect(() => {
    const onChangeSize = () => {
      setTranslateYValue(calculateClientHeightElementsSum(indexTargetSection));
    };
    window.addEventListener('resize', onChangeSize);

    return () => {
      window.removeEventListener('resize', onChangeSize);
    };
  }, [indexTargetSection, translateYValue]);

  useEffect(() => {
    document.body.classList.add(BODY_HIDDEN_SCROLL);
    return () => {
      document.body.classList.remove(BODY_HIDDEN_SCROLL);
    };
  }, []);

  const onSectionSwipedDown = () => {
    changeTargetSection({ sections: containerRef.current.children, isTopScrolling: false });
  };

  const onSectionSwipedUp = () => {
    changeTargetSection({ sections: containerRef.current.children, isTopScrolling: true });
  };

  const onSectionSwipingUp = (e) => {
    const { y1, y2 } = e;
    // console.log('onSectionSwipingUp', { y1, y2 });
    const newTranslateYValue = Math.abs(y1 - y2);
    setTranslateYValue(newTranslateYValue);
  };

  // const onSectionSwipingDown = (e) => {
  //   const { y1, y2 } = e;
  //   console.log('onSectionSwipingDown', { y1, y2 });
  //   // const newTranslateYValue = y2 - y1;
  //   // setTranslateYValue(newTranslateYValue);
  // };

  const isTarget = (targetIndex, index) => targetIndex === index;

  return (
    <div
      className="full-page"
      ref={containerRef}
      onWheel={onWheelScroll}
      style={{ transform: `translateY(${translateYValue}px)` }}
    >
      {
        !isNil(children)
          ? (
            React.Children.map(children, (element, index) => (
              <Swipeable
                turnOnClick
                onSwipedDown={onSectionSwipedDown}
                onSwipedUp={onSectionSwipedUp}
                onSwipingUp={onSectionSwipingUp}
                // onSwipingDown={onSectionSwipingDown}
              >
                <section className={`full-page-block ${isTarget(indexTargetSection, index) ? FULL_PAGE_BLOCK_TARGET : EMPTY_CLASS}`}>
                  {element}
                </section>
              </Swipeable>
            ))
          )
          : null
    }
    </div>
  );
};

FullPage.propTypes = {
  onChangeTargetSection: PropTypes.func,
};

FullPage.defaultProps = {
  onChangeTargetSection: () => {},
};

export default FullPage;
