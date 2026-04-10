import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

const RobotModel = (props: any) => {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2; // Auto rotate slowly
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1; // Gentle floating
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Simple futuristic abstract placeholder shape to look premium until a real GLB is imported */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <octahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial 
          color="#10b981" 
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
          emissive="#000000"
        />
      </mesh>
      
      {/* Core ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, Math.sin(Date.now() / 1000) * 0.2, 0]} castShadow>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.5} roughness={0.1} metalness={1} />
      </mesh>
    </group>
  );
};

export default RobotModel;
