import './App.css';
import * as ARjs from 'arjs';

function App() {

  return (

    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-cone position='0 0.5 0' rotation="0 0 0" radius-bottom="0.5" material='opacity: 0.75; color: red;'></a-cone>
      </a-marker>
    <a-entity camera></a-entity>
    </a-scene>

  );
}

export default App;
