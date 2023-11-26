'use client'

import * as THREE from 'three';
import { useEffect, useRef } from "react";
import BoxTest from '@/components/boxTest.js'

function Home() {
  return (
    <main>
      <section>
        <h1>Test Section</h1>
      </section>
      <BoxTest></BoxTest> 
      <section>
        <h1>Another Test</h1>
      </section>
    </main>
  );
};

export default Home;