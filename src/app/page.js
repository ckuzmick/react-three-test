'use client'

import Image from 'next/image'
import { createRoot } from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import "./globals.css";
import * as THREE from 'three';
import '../../public/packers.jpg';
import { useRef } from 'react';

// function MyRotatingBox() {
//   const myMesh = useRef();

//   useFrame(({ clock }) => {
//     const a = clock.getElapsedTime();
//     myMesh.current.rotation.x = (a*a) / 5;
//     myMesh.current.rotation.y = a*2;
//   });

//   return (
//     <mesh ref={myMesh}>
//       <boxGeometry />
//       <meshNormalMaterial wireframe={true} />
//     </mesh>
//   );
// }

export default function Home() {
  // const myMesh = useRef();

  // useFrame(({ clock }) => {
  //   const a = clock.getElapsedTime();
  //   myMesh.current.rotation.x = (a*a) / 5;
  //   myMesh.current.rotation.y = a*2;
  // });

  return (
    <main>
      <div id="root">
        <Canvas style={{ height: '100vh' }}>
          <ambientLight intensity={100} />
          <directionalLight color="white" intensity={10} position={[0, 1, 10]} />
          <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]}/>
            <meshNormalMaterial wireframe={true} ref={box}/>
          </mesh>
          {/* <MyRotatingBox/> */}
        </Canvas>
      </div>
    </main>
  )
}