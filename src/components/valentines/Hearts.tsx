import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const createHeartShape = () => {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  
  // More detailed heart shape
  shape.moveTo(x, y);
  shape.bezierCurveTo(x, y - 3, x - 5, y - 3, x - 5, y);
  shape.bezierCurveTo(x - 5, y + 3, x, y + 6, x, y + 10);
  shape.bezierCurveTo(x, y + 6, x + 5, y + 3, x + 5, y);
  shape.bezierCurveTo(x + 5, y - 3, x, y - 3, x, y);
  
  return shape;
};

export const Hearts = ({ position }: { position: [number, number, number] }) => {
  const heartsRef = useRef<THREE.Group>(null);
  
  const hearts = useMemo(() => {
    const heartShape = createHeartShape();
    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };
    
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      initialPosition: [
        (Math.random() - 0.5) * 3,
        Math.random() * 2,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      accumulatedPosition: [
        (Math.random() - 0.5) * 4,
        -2,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.015 + Math.random() * 0.02,
      delay: i * 0.3,
      geometry: new THREE.ExtrudeGeometry(heartShape, extrudeSettings),
      phase: 'rising' as 'rising' | 'falling' | 'accumulated',
      fallStartTime: 0,
    }));
  }, []);

  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.children.forEach((heart, index) => {
        const heartData = hearts[index];
        const time = state.clock.elapsedTime - heartData.delay;
        
        if (time > 0) {
          if (heartData.phase === 'rising') {
            // Rising phase
            heart.position.y = heartData.initialPosition[1] + time * 0.4;
            heart.position.x = heartData.initialPosition[0] + Math.sin(time * 2) * 0.3;
            heart.position.z = heartData.initialPosition[2] + Math.cos(time * 2) * 0.3;
            
            // Gentle rotation
            heart.rotation.x += 0.01;
            heart.rotation.y += 0.015;
            
            // Scale with breathing effect
            const breathingScale = heartData.scale * (1 + Math.sin(time * 4) * 0.15);
            heart.scale.setScalar(breathingScale);
            
            // Start falling after reaching peak
            if (heart.position.y > 3) {
              heartData.phase = 'falling';
              heartData.fallStartTime = state.clock.elapsedTime;
            }
          } else if (heartData.phase === 'falling') {
            // Falling phase with physics
            const fallTime = state.clock.elapsedTime - heartData.fallStartTime;
            const gravity = -2;
            
            heart.position.y = 3 + gravity * fallTime * fallTime * 0.5;
            heart.position.x = THREE.MathUtils.lerp(heart.position.x, heartData.accumulatedPosition[0], 0.02);
            heart.position.z = THREE.MathUtils.lerp(heart.position.z, heartData.accumulatedPosition[2], 0.02);
            
            // Rotation slows down
            heart.rotation.x += 0.005;
            heart.rotation.y += 0.008;
            
            // Land and accumulate
            if (heart.position.y <= heartData.accumulatedPosition[1]) {
              heart.position.y = heartData.accumulatedPosition[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.05;
              heartData.phase = 'accumulated';
            }
          } else if (heartData.phase === 'accumulated') {
            // Gentle floating on ground
            heart.position.y = heartData.accumulatedPosition[1] + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.08;
            heart.rotation.y += 0.003;
            
            // Subtle scale breathing
            const breathingScale = heartData.scale * (1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.1);
            heart.scale.setScalar(breathingScale);
          }
        }
      });
    }
  });

  return (
    <group ref={heartsRef} position={position}>
      {hearts.map((heart) => (
        <mesh
          key={heart.id}
          geometry={heart.geometry}
          position={heart.initialPosition}
          rotation={heart.rotation}
          scale={heart.scale}
        >
          <meshStandardMaterial
            color="#ff1493"
            metalness={0.6}
            roughness={0.3}
            emissive="#ff69b4"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};