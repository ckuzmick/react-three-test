'use client'

import * as THREE from 'three';
import { useEffect, useRef } from "react";
import '@/../public/packers.jpg';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import '../globals.css';

function MyThree() {

  const refContainer = useRef(null);

  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = -1.5 + window.scrollY / 250.0;
    var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body

    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    var labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      labelRenderer.domElement.style.color = 'white';

      refContainer.current && refContainer.current.appendChild( labelRenderer.domElement );

    var h1 = document.createElement('h1');
      h1.textContent = 'Who is really titletown?';
      var testP = new CSS2DObject(h1)  
      scene.add(testP);
      testP.position.set(0,2,0);

    var geometry = new THREE.BoxGeometry(2, 1, .5);
    var material = new THREE.MeshNormalMaterial({ wireframe: true });
    var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      
    camera.position.z = 5;

    var animate = function () {
      let scrollY = window.scrollY;
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      camera.position.y = scrollY
    };
    animate();

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

  }, []);
  return (
    <main>
    <div ref={refContainer}/>
    </main>
  );
};

export default MyThree;