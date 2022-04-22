<template>
    <div class="text-box">
      <div class="heading">Slr.Finance</div>
      <div class="button-wrapper">
          <a href="https://app.slr.finance" class="button">Launch app</a>
          <a href="https://docs.slr.finance" class="button">Docs</a>
      </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Scene, PerspectiveCamera, Color, Fog, WebGLRenderer, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute } from 'three'
import { useEventListener } from '@vueuse/core'

export default defineComponent({
  setup() {
			let camera:PerspectiveCamera, scene:Scene, renderer:WebGLRenderer;

			let points:Points;
  const init = () => {
				camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2500 );
				camera.position.z = 250;
				camera.position.y = 500;
				scene = new Scene();
				scene.background = new Color( 0x050505 );
				scene.fog = new Fog( 0x050505, 2000, 3500 );

				//

				const particles = 5000;

				const geometry = new BufferGeometry();

				const positions:number[] = [];
        const state:number[] = []
				const colors:number[] = [];

				const color = new Color();

				const n = 2000, n2 = n / 2; // particles spread in the cube

				for ( let i = 0; i < particles; i ++ ) {

					// positions

					const x = Math.random() * n - n2;
					const y = Math.random() * n - n2;
					const z = Math.random() * n - n2;

					positions.push( x, y, z );

					// colors

					const vx = ( x / n ) + 1;
					const vy = ( y / n ) + 0.1;
					const vz = ( z / n ) + 1;

					color.setRGB( vx, vy, vz );

					colors.push( color.r, color.g, color.b );

				}

				geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

				geometry.computeBoundingSphere();

				//

				const material = new PointsMaterial( { size: 0.7, vertexColors: true, sizeAttenuation: false } );

				points = new Points( geometry, material );
				scene.add( points );

				//

				renderer = new WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				document.body.appendChild( renderer.domElement );

				//

				//

			window.addEventListener( 'resize', onWindowResize );
animate()

  }






  function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//
    let mousePos = [0, 0]

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				const time = Date.now() * 0.00001;
        camera.rotation.z += time * 0.00000000002;
				//points.rotation.z = time * 0.2;
				points.rotation.y = (mousePos[0] / window.innerWidth)*0.2
				camera.rotation.x = (mousePos[1] / window.innerHeight)*0.2
				points.rotation.x = time * 10;
points.animations
				renderer.render( scene, camera );

			}


    onMounted(() => {
        useEventListener(document, 'mousemove', (evt) => {
          mousePos[0]=evt.screenX
          mousePos[1]=evt.screenY
        })
        try {
            init();
            
        } catch (error) {
            console.error(error)
        }
    })
  },
})
</script>


<style>
body, html {
  background: black;
  padding: 0;
  margin: 0;
}



body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: black;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  position: absolute;
  top:0;
  left:0;
  z-index: 1;
}
.text-box {
  position: relative;
  z-index: 2;
  font-size: 60px;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 7px;
  word-spacing: 12px;
  text-transform: uppercase;
  color:rgb(238, 238, 238);
}
.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: row;
}
.button {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  margin-left:20px;
  margin-right:20px;
  word-spacing: normal;
  letter-spacing: 5px;
  border: 1px solid white;
  background: black;
  cursor: pointer;
}
</style>