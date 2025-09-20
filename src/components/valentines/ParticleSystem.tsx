import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a sphere around the gift box
      const i3 = i * 3;
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi) - 1;
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Random colors - pink, gold, white
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Pink
        colors[i3] = 1;
        colors[i3 + 1] = 0.41;
        colors[i3 + 2] = 0.71;
      } else if (colorChoice < 0.7) {
        // Gold
        colors[i3] = 1;
        colors[i3 + 1] = 0.84;
        colors[i3 + 2] = 0;
      } else {
        // White
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Rising motion
        positions[i + 1] += 0.01;
        
        // Swirling motion
        const time = state.clock.elapsedTime * 0.5;
        positions[i] += Math.sin(time + i) * 0.001;
        positions[i + 2] += Math.cos(time + i) * 0.001;
        
        // Reset particles that are too high
        if (positions[i + 1] > 5) {
          positions[i + 1] = -3;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Gentle rotation
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};