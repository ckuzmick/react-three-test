'use client'

import Image from 'next/image'
import { createRoot } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import "./globals.css";

export default function Home() {
  return (
    <main>
      <div id="root">
        <Canvas style={{ height: '100vh' }}>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, -1, 10]} />
          <mesh rotation={[1, 1, 1]} position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshToonMaterial wireframe={false}/>
          </mesh>
        </Canvas>
      </div>
    </main>
  )
}