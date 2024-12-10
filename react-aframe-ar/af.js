'use strict';

const container = document.querySelector('#marker');

function App() {
    return (
        <div>
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        </div>
    );
}

const root = ReactDOM.createRoot(container);
root.render(<App tab="home"/>);
