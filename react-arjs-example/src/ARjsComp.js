import React from 'react'
import 'aframe'
import 'arjs'

export default class ARjsComp extends React.Component {

  componentDidMount(){
  }

  render (){
    return(
      <div
          style={{ width: "800px", height: "800px" }}
          ref={mount => { this.mount = mount}}
      >
       <a-scene embedded arjs>
         <a-marker preset="hiro">
           <a-cone position='0 0.5 0' rotation="0 0 0" radius-bottom="0.5" material='opacity: 0.75; color: red;'></a-cone>
         </a-marker>
       <a-entity camera></a-entity>
       </a-scene>
      </div>
    )
  }

}
