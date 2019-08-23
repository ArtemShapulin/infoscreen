import React from 'react';

import FullPage from 'components/FullPage/FullPage';

import './style.scss';

// const html = document.documentElement;

// (() => {
//   if (html.requestFullscreen) {
//     html.requestFullscreen();
//   } else if (html.mozRequestFullScreen) {
//     html.mozRequestFullScreen();
//   } else if (html.webkitRequestFullscreen) {
//     html.webkitRequestFullscreen();
//   } else if (html.msRequestFullscreen) {
//     html.msRequestFullscreen();
//   }
// })();

const App = () => (
  <div className="page-root">
    <FullPage>
      <div className="plane plane_red" />
      <div className="plane plane_black" />
      <div className="plane plane_aqua" />
      <div className="plane plane_green" />
    </FullPage>
  </div>
);


export default App;
