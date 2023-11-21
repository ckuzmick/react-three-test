'use client'

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../globals.css';

function MyThree() {
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
    controls.autoRotateSpeed = 1;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    // var labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize(window.innerWidth, window.innerHeight);
    // labelRenderer.domElement.style.position = 'absolute';
    // labelRenderer.domElement.style.top = '0px';
    // labelRenderer.domElement.style.color = 'white';

    // refContainer.current && refContainer.current.appendChild(labelRenderer.domElement);

    // var h1 = document.createElement('h1');
    // h1.textContent = 'Who is really titletown?';
    // var testP = new CSS2DObject(h1);
    // scene.add(testP);
    // testP.position.set(0, 2, 0);

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

    const heights1 = [
      3, 4, 8, 6, 3, 4, 9, 4, 5, 6, 10, 12, 14, 10, 9, 4
    ]

    const heights2 = [
      4, 5, 7, 2, 3, 8, 12, 5, 10, 3, 4, 2, 7, 2, 7, 3
    ]

    const max = (array) => Math.max(array);
    const length = (array) => array.length;

    var material = new THREE.MeshNormalMaterial({ wireframe: false });

    // for (const [i, point] in points) {
    //   const geometry = new THREE.BoxGeometry(.5, .5, .5);
    //   var cube = new THREE.Mesh(geometry, material);
    //     cube.position.x = points[point].x;
        // cube.position.y = points[point].y;
        // cube.position.z = points[point].z;
    //     scene.add(cube);
    // };
    
    createBarChart = (array) => {
      array.forEach((bar, i) => {
        const geometry = new THREE.BoxGeometry(.5, bar, .5);
        var cube = new THREE.Mesh(geometry, material);
          cube.position.x = i - length(array)/2 + .5;
          cube.position.y = bar/2 - max(array)/2;
          cube.position.z = 0;
          scene.add(cube);
      })
    };

    createBarChart(heights1)

    // heights1.forEach((bar, i) => {
    //   const geometry = new THREE.BoxGeometry(.5, bar1, .5);
    //   var cube = new THREE.Mesh(geometry, material);
    //     cube.position.x = i - length(heights1)/2 + .5;
    //     cube.position.y = bar/2 - max(heights1)/2;
    //     cube.position.z = 0;
    //     scene.add(cube);
    // });

    // var geometry = new THREE.BoxGeometry(points[0].x, points[0].y, points[0].z);
    // var material = new THREE.MeshNormalMaterial({ wireframe: false });
    // var cube = new THREE.Mesh(geometry, material);
    //   scene.add(cube);

    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshNormalMaterial({ wireframe: false });
    // var cube = new THREE.Mesh(geometry, material);
    //   scene.add(cube);

    camera.position.z = 10;

    var animate = function () {
      let scrollY = window.scrollY;
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      // labelRenderer.render(scene, camera);
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
