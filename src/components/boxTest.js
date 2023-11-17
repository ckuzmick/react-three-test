'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../app/globals.css';

const BoxTest = () => {
  const refContainer = useRef(null);

  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -1.5 + window.scrollY / 250.0;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
      ORBIT: THREE.MOUSE.RIGHT,
      DOLLY: THREE.MOUSE.MIDDLE,
      PAN: THREE.MOUSE.LEFT,
    };
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.08;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.08;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 1;
    controls.maxDistance = 6;

    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(2, 1, 0.5);
    var material = new THREE.MeshNormalMaterial({ wireframe: false });
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

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    
  }, []);

  return <div ref={refContainer} />;
};

export default BoxTest;
