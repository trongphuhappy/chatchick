import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/robot_playground.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { nodes, materials, animations, scene } = useGLTF(
    "/robot_playground.glb"
  )
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    //@ts-ignore
    actions["Experiment"].play()
  }, [actions])

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}
