'use client'

import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        refContainer.current && refContainer.current.appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry(3, 3, 3);
        // var material = new THREE.MeshNormalMaterial({ wireframe: true });
        // var cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
        camera.position.z = 5;
        // var animate = function () {
        //   requestAnimationFrame(animate);
        //   cube.rotation.x += 0.01;
        //   cube.rotation.y += 0.01;
        //   renderer.render(scene, camera);
        // };
        // animate();
        const loader = new FontLoader()
            loader.load('/../../public/typeface.json', function (font) {
            const geometry = new TextGeometry('Hello Three.js!', {
                font: font,
                size: 3,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 0.5,
                bevelSize: 0.3,
                bevelOffset: 0,
                bevelSegments: 5,
            });
        });
        const material1 = new THREE.MeshPhongMaterial({
            color: 'blue',
            flatShading: true,
        }); // front
        const material2 = new THREE.MeshPhongMaterial({
            color: 'blue'
        }); // side
        const mesh = new THREE.Mesh(geometry, [ material1, material2 ])
        mesh.name = 'text'
        scene.add(mesh)
    }, []);
    return (
        <div ref={refContainer}/>
    );
};

export default MyThree;