import * as THREE from 'three';
import React from 'react';

const max = (array) => Math.max(...array);
const length = (array) => array.length;

const createBarChart = (array, x, y, z, material, scene) => {
    array.forEach((bar, i) => {
        const geometry = new THREE.BoxGeometry(.5, bar, .5);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = i - length(array)/2 + .5 + x;
        cube.position.y = bar/2 - max(array)/2 + y;
        cube.position.z = z;
        scene.add(cube);
    });
};

export default createBarChart;