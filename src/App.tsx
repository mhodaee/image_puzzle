import React from 'react';
import ImageBlock from "./components/image-block";

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Image"><img src={ require('./image1.png') } alt='puzzle'></img></div>
      <div className="Puzzle">
        <ImageBlock />
      </div>
      <div id="msg" className="Message">
      </div>
    </div>
  );
}

export default App;
