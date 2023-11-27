import * as THREE from 'three';
import React from 'react';

const createScatterPlot = (array, x, y, z, material, scene, size) => {
    array.map((point) => {
        const geometry = new THREE.SphereGeometry(size, size, size);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = point.x + x;
        cube.position.y = point.y + y;
        cube.position.z = point.z + z;
        // cube.rotation.x = .5;
        // cube.rotation.y = .5;
        scene.add(cube);
    });
};

export default createScatterPlot;