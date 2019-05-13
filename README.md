# React AR experiments

Some experiments with [THREEAR.js](https://github.com/JamesMilnerUK/THREEAR), [React.js](https://reactjs.org/) and [Three.js](https://threejs.org/).
In a Future i will add other examples tests...

For now you can find the [react-threear-example](https://github.com/kalwalt/react-AR-experiments/tree/master/react-threear-example) a simple example to show the THREEAR lib in action with React.js.
This is the basic setup to start a project with the two libs.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to start a project from scratch

1. Start a project with the create React app with the command:

    `npx create-react-app your-project-name`

2. Install Three.js and THEEAR.js with npm

    `npm install three threear`

3. Check if in package.json are installed the two libs.
4. In App.js import the two libs (with const require)
5. In the `render()` method of the App Component inject THREE renderer and camera into the `THREEAR.source()`:

    `var source = new THREEAR.Source({ renderer, camera });`
6. Initialize the tracking process:

```javascript
      THREEAR.initialize({ source: source }).then((controller) => {
          /* Three.js code here (mesh, materials... to be attached to the marker)*/
          var path = './data/patt.hiro';
          var patternMarker = new THREEAR.PatternMarker({
      					patternUrl: path,
      					markerObject: markerGroup
      				});
    	    controller.trackMarker(patternMarker);
      )};
```
7. Remember to update the controller in the `requestAnimationFrame`:

```javascript
        requestAnimationFrame(function animate(nowMsec){
        // measure time
        // your measure time code here
        renderer.render( scene, camera );
        controller.update( source.domElement );

        // keep looping
        requestAnimationFrame( animate );
        });

```
8. In `return()` create a simple div:

```javascript
      return(
      <div></div>
      )
```
## Final notes

One important thing: resources (patterns, images, video...) must be in the public folder.

## Available Scripts

In every project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
