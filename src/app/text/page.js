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
    controls.autoRotateSpeed = 0.08;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 1;
    controls.maxDistance = 6;

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
        "x": 1,
        "y": 2,
        "z": 4
      },
      {
        "x": 1,
        "y": 5,
        "z": 2
      },
      {
        "x": 1,
        "y": 7,
        "z": 6
      }
    ]

    for (const point in points) {
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var cube = new THREE.Mesh(geometry, material);
        cube.position.x = point.x;
        cube.position.y = point.y;
        cube.position.z = point.z;
        return scene.add(cube);
    };

    // var geometry = new THREE.BoxGeometry(points[0].x, points[0].y, points[0].z);
    // var material = new THREE.MeshNormalMaterial({ wireframe: false });
    // var cube = new THREE.Mesh(geometry, material);
    //   scene.add(cube);

    camera.position.z = 5;

    var animate = function () {
      let scrollY = window.scrollY;
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
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
