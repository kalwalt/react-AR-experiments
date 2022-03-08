import React from 'react'
import { ArToolkitProfile, ArToolkitSource, ArToolkitContext, ArMarkerControls} from '@ar-js-org/ar.js/three.js/build/ar-threex.js';
import * as THREE from 'three';

export default class ThreexComp extends React.Component {

    componentDidMount() {
        ArToolkitContext.baseURL = './'
        // init renderer
	    var renderer	= new THREE.WebGLRenderer({
		    // antialias	: true,
		    alpha: true
	    });
	    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	    // renderer.setPixelRatio( 2 );
	    renderer.setSize(640, 480);
	    renderer.domElement.style.position = 'absolute'
	    renderer.domElement.style.top = '0px'
	    renderer.domElement.style.left = '0px'
	    document.body.appendChild( renderer.domElement );

	    // array of functions for the rendering loop
	    var onRenderFcts= [];
		var arToolkitContext, arMarkerControls;

	    // init scene and camera
	    var scene	= new THREE.Scene();

	    //////////////////////////////////////////////////////////////////////////////////
	    //		Initialize a basic camera
	    //////////////////////////////////////////////////////////////////////////////////

	    // Create a camera
	    var camera = new THREE.Camera();
	    scene.add(camera);
        const artoolkitProfile = new ArToolkitProfile()
	    artoolkitProfile.sourceWebcam()

	    const arToolkitSource = new ArToolkitSource(artoolkitProfile.sourceParameters)

        arToolkitSource.init(function onReady(){
			initARContext();
		    onResize()
	    })

	    // handle resize
	    window.addEventListener('resize', function(){
		    onResize()
	    })
	    function onResize(){
		    arToolkitSource.onResizeElement()
		    arToolkitSource.copyElementSizeTo(renderer.domElement)
		    if( arToolkitContext.arController !== null ){
			    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
		    }
	    }

		function initARContext() { // create atToolkitContext
			arToolkitContext = new ArToolkitContext({
				cameraParametersUrl: ArToolkitContext.baseURL + '../data/camera_para.dat',
				detectionMode: 'mono'
			})
			// initialize it
			arToolkitContext.init(() => { // copy projection matrix to camera
				camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());

				arToolkitContext.arController.orientation = getSourceOrientation();
				arToolkitContext.arController.options.orientation = getSourceOrientation();

				console.log('arToolkitContext', arToolkitContext);
				window.arToolkitContext = arToolkitContext;
			})

			// MARKER
			arMarkerControls = new ArMarkerControls(arToolkitContext, camera, {
				type: 'pattern',
				patternUrl: ArToolkitContext.baseURL + '../data/patt.hiro',
				// patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
				// as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
				changeMatrixMode: 'cameraTransformMatrix'
			})

			scene.visible = false

			console.log('ArMarkerControls', arMarkerControls);
			window.arMarkerControls = arMarkerControls;
		}


		function getSourceOrientation() {
			if (!arToolkitSource) {
				return null;
			}

			console.log(
				'actual source dimensions',
				arToolkitSource.domElement.videoWidth,
				arToolkitSource.domElement.videoHeight
			);

			if (arToolkitSource.domElement.videoWidth > arToolkitSource.domElement.videoHeight) {
				console.log('source orientation', 'landscape');
				return 'landscape';
			} else {
				console.log('source orientation', 'portrait');
				return 'portrait';
			}
		}

	    // update artoolkit on every frame
		onRenderFcts.push(function () {
			if (!arToolkitContext || !arToolkitSource || !arToolkitSource.ready) {
				return;
			}

			arToolkitContext.update(arToolkitSource.domElement)

			// update scene.visible if the marker is seen
			scene.visible = camera.visible
		})

	    //////////////////////////////////////////////////////////////////////////////////
	    //		add an object in the scene
	    //////////////////////////////////////////////////////////////////////////////////

		var markerGroup = new THREE.Group()
	    scene.add(markerGroup)
	    var markerScene = new THREE.Scene()
	    markerGroup.add(markerScene)

	    var axes = new THREE.AxesHelper()
	    markerScene.add(axes)

	    // add a torus knot
	    var geometry	= new THREE.BoxGeometry(1,1,1);
	    var material	= new THREE.MeshNormalMaterial({
		    transparent : true,
		    opacity: 0.5,
		    side: THREE.DoubleSide
	    });
	    var mesh	= new THREE.Mesh( geometry, material );
	    mesh.position.y	= geometry.parameters.height/2
	    markerScene.add(mesh)

	    var tgeometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
	    var tmaterial	= new THREE.MeshNormalMaterial();
	    var torus	= new THREE.Mesh( tgeometry, tmaterial );
	    torus.position.y	= 0.5
	    markerScene.add( torus );

	    onRenderFcts.push(function(delta){
		    torus.rotation.x += delta * Math.PI
	    })

        //////////////////////////////////////////////////////////////////////////////////
	    //		render the whole thing on the page
	    //////////////////////////////////////////////////////////////////////////////////
	    onRenderFcts.push(function(){
		    renderer.render( scene, camera );
	    })

        // run the rendering loop
	    var lastTimeMsec= null
	    requestAnimationFrame(function animate(nowMsec){
		    // keep looping
		    requestAnimationFrame( animate );
		    // measure time
		    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		    lastTimeMsec	= nowMsec
		    // call each update function
		    onRenderFcts.forEach(function(onRenderFct){
			    onRenderFct(deltaMsec/1000, nowMsec/1000)
		    })
	    })
    }

    render() {
        return (
        <div 
            style={{ width: "800px", height: "800px" }}
            ref={mount => { this.mount = mount}}
        />
        )
    }       
}