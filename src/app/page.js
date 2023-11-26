'use client'

import * as THREE from 'three';
import { useEffect, useRef } from "react";
import BoxTest from '@/components/boxTest.js'

function Home() {
  return (
    <main>
      <section>
        <h1>Hi!</h1>
        <p>You&apos;re now on my react-three testing site, there&apos;s some more stuff at <a href="/text">/text</a></p>
      </section>
    </main>
  );
};

export default Home;