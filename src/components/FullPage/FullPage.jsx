import React, { useEffect, useRef } from 'react';
import isNil from 'lodash/isNil';
import findIndex from 'lodash/findIndex';

import isVisibleElement from 'utils/isVisibleElement';
import { BODY_HIDDEN_SCROLL, FULL_PAGE_BLOCK_TARGET } from './constants';

import './style.scss';

const FullPage = ({ children }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    document.body.classList.add(BODY_HIDDEN_SCROLL);
    const index = findIndex(containerRef.current.children, (element) => isVisibleElement(element));
    containerRef.current.children[index].classList.add(FULL_PAGE_BLOCK_TARGET);

    const onChangeSize = () => {
      // const sections = containerRef.current.children;
      // const indexTarget = findIndex(sections, (element) => element.classList.contains(FULL_PAGE_BLOCK_TARGET));

      // if (indexTarget === sections.length - 1) {

      // }
      // else if(!indexTarget) {

      // }
      // else {

      // }
    };

    const onWheelScroll = (e) => {
      const oldValue = parseInt(+containerRef.current.style.transform.replace('translateY(', '').replace('px)', ''));
      const isTopScrolling = oldValue - parseInt(e.deltaY) > oldValue;
      const sections = containerRef.current.children;
      let indexTarget = findIndex(sections, (element) => element.classList.contains(FULL_PAGE_BLOCK_TARGET));

      if ((indexTarget === sections.length - 1 && !isTopScrolling) || (!indexTarget && isTopScrolling)) {
        return false;
      }

      sections[indexTarget].classList.remove(FULL_PAGE_BLOCK_TARGET);
      indexTarget = isTopScrolling ? indexTarget - 1 : indexTarget + 1;
      sections[indexTarget].classList.add(FULL_PAGE_BLOCK_TARGET);
      const { clientHeight } = sections[indexTarget];

      const newValue = isTopScrolling ? oldValue + clientHeight : oldValue - clientHeight;
      containerRef.current.style.transform = `translateY(${newValue}px)`;
      return false;
    };

    window.addEventListener('wheel', onWheelScroll, true);
    window.addEventListener('resize', onChangeSize);
    window.addEventListener('orientationChange', onChangeSize);

    return () => {
      window.removeEventListener('wheel', onWheelScroll, true);
      window.removeEventListener('resize', onChangeSize);
      window.removeEventListener('orientationChange', onChangeSize);
      document.body.classList.remove(BODY_HIDDEN_SCROLL);
      containerRef.current.children.getElementsByClassName(FULL_PAGE_BLOCK_TARGET).item(0).classList.remove(FULL_PAGE_BLOCK_TARGET);
    };
  }, []);

  return (
    <div className="full-page" ref={containerRef}>
      {
        !isNil(children)
          ? (
            React.Children.map(children, (element) => (
              <section className="full-page-block">
                {element}
              </section>
            ))
          )
          : null
    }
    </div>
  );
};

export default FullPage;
