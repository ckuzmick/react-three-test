'use client'

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../globals.css';
import createBarChart from '@/functions/barChart';

function MyThree() {
  const ref = useRef(null);

  var targetDistance = 60;
  const setTargetDistance = (distance) => {
    targetDistance = distance;
  };

  var distState = false;

  useEffect(() => {
    var scene = new THREE.Scene();
      scene.background = new THREE.Color().setHSL(0, 0, 0);
      scene.fog = new THREE.Fog(scene.background, 21, 40);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.color.setHSL(0.1, 1, 0.95);
      dirLight.position.set(0, 20, 50);
      dirLight.position.multiplyScalar(30);
      dirLight.castShadow = true;
      scene.add(dirLight);

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 60;

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
      controls.autoRotateSpeed = 1;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minDistance = -100;
      controls.maxDistance = 100;

    ref.current && ref.current.append(renderer.domElement);

    const points = [
      {
        x: -1,
        y: 2,
        z: 0,
      },
      {
        x: 5,
        y: 5,
        z: 0,
      },
      {
        x: -3,
        y: 7,
        z: 0,
      },
    ];

    const heights = [3, 4, 8, 6, 3, 4, 9, 4, 5, 6, 10, 12, 14, 10, 9, 4];

    const heights2 = [4, 5, 7, 2, 3, 8, 12, 5, 10, 3, 10, 12, 4, 7, 10];

    const material = new THREE.MeshStandardMaterial({ wireframe: false, roughness: 0.5, metalness: 1 });

    createBarChart(heights2, 0, 0, 40, material, scene);
    createBarChart(heights, 0, 0, 20, material, scene);
    createBarChart(heights2, 0, 0, 0, material, scene);

    const changeDist = (distance) => {
      if (distance !== targetDistance && distState) {
          camera.position.z += (targetDistance - distance) / 10;
          console.log(distState)
          if ((targetDistance - 0.5) < distance && distance < (targetDistance + 0.5)) {
            console.log('this is working')
            camera.position.z = targetDistance
          };
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      changeDist(camera.position.z);
      console.log(distState, targetDistance, camera.position.z);
      if (targetDistance == camera.position.z) {
        distState = false
      };
    };

    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

  }, [targetDistance]);

  const handleButtonClick = (distance) => {
    distState = true;
    setTargetDistance(distance);
    console.log(distance)
    console.log(distState)
  };

  return (
    <main>
      <div className='buttons'>
        <button className='button' onClick={() => handleButtonClick(20)}>
          Graph 1
        </button>
        <button className='button' onClick={() => handleButtonClick(40)}>
          Graph 2
        </button>
        <button className='button' onClick={() => handleButtonClick(60)}>
          Graph 3
        </button>
      </div>
      <div className='canvas' ref={ref}></div>
    </main>
  );
}

export default MyThree;
