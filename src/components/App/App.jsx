import React from 'react';

import FullPage from 'components/FullPage/FullPage';

import './style.scss';

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
