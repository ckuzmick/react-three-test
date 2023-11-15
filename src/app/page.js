'use client'

import Image from 'next/image'
import { createRoot } from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import "./globals.css";
import * as THREE from 'three';
import '../../public/packers.jpg';
import { useRef } from 'react';

const texture = new
THREE.TextureLoader().load('../../public/packers.jpg');

texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Repeat the texture
texture.repeat.set(1, 1); // Number of times the texture is repeated in each direction
texture.offset.set(0, 0);

function MyRotatingBox() {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a*a;
    myMesh.current.rotation.y = a*2;
  });

  return (
    <mesh ref={myMesh}>
      <boxGeometry />
      <meshNormalMaterial wireframe={true} />
    </mesh>
  );
}

export default function Home() {
  return (
    <main>
      <div id="root">
        <Canvas style={{ height: '100vh' }}>
          <ambientLight intensity={100} />
          <directionalLight color="white" intensity={10} position={[0, 1, 10]} />
          {/* <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[10, 2, 10]}/>
            <meshNormalMaterial wireframe={true}/>
          </mesh> */}
          <MyRotatingBox/>
        </Canvas>
      </div>
    </main>
  )
}