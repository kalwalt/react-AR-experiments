import React from 'react';
import './App.css';
const THREE = require('three');
//const AR = require('threear');


class App extends React.Component {

  render(){
    const AR = require('threear');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    function animate() {
	     requestAnimationFrame( animate );
	      renderer.render( scene, camera );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
    animate();
  return(
  <div></div>
  )
  }
}

export default App;
