"use client"

import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
      <directionalLight position={[-5, -5, 5]} intensity={4} />
      <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  )
}
