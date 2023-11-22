'use client'

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../globals.css';
import createBarChart from '@/functions/barChart';

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = -1.5 + window.scrollY / 250.0;
    var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const spotLight = new THREE.SpotLight({ color: 0xffffff, intensity: 100000 });
      spotLight.position.set( 0, 10, 10 );
      
      spotLight.castShadow = true;
      
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      
      spotLight.shadow.camera.near = 500;
      spotLight.shadow.camera.far = 4000;
      spotLight.shadow.camera.fov = 10;
      
      scene.add( spotLight );

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

    refContainer.current.appendChild(renderer.domElement);

    const points = [
      {
        x: -1,
        y: 2,
        z: 0
      },
      {
        x: 5,
        y: 5,
        z: 0
      },
      {
        x: -3,
        y: 7,
        z: 0
      }
    ]

    const heights = [
      3, 4, 8, 6, 3, 4, 9, 4, 5, 6, 10, 12, 14, 10, 9, 4
    ]

    const heights2 = [
      4, 5, 7, 2, 3, 8, 12, 5, 10, 3, 10, 12, 4, 7, 10
    ]
    
    var material = new THREE.MeshStandardMaterial({ wireframe: false, roughness: .5, metalness: 1 });

    createBarChart(heights, 0, 0, 20, material, scene)
    createBarChart(heights2, 0, 0, 0, material, scene)

    camera.position.z = 10;

    var animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }, []);

  return (
    <main>
      <div ref={refContainer} />
    </main>
  );
}

export default MyThree;
