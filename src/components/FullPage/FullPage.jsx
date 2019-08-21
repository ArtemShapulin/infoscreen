import React, { useEffect } from 'react';
import isNil from 'lodash/isNil';
import BODY_HIDDEN_SCROLL from './constants';

import './style.scss';

const FullPage = ({ children }) => {
  useEffect(() => {
    document.body.classList.add(BODY_HIDDEN_SCROLL);

    const onBodyScroll = () => {
      window.scrollBy({
        top: 100,
        left: 0,
        behavior: 'smooth',
      });
    };

    document.body.addEventListener('scroll', onBodyScroll);
    return () => {
      document.body.classList.remove(BODY_HIDDEN_SCROLL);
      document.body.removeEventListener('scroll', onBodyScroll);
    };
  }, []);
  return (
    <div className="full-page">
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
