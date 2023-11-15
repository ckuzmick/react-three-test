'use client'

import * as THREE from 'three';
import { useEffect, useRef } from "react";
import '/../../public/packers.jpg';

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    const bg = new THREE.TextureLoader().load('/../../public/packers.jpg');
    scene.scene.background = bg;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshNormalMaterial({ wireframe: true });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    <div ref={refContainer}/>
  );
};

export default MyThree;