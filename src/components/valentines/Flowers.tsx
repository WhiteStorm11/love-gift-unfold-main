import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const FlowerPetal = ({ position, rotation, scale }: { 
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) => {
  return (
    <Sphere
      args={[0.1, 8, 6]}
      position={position}
      rotation={rotation}
      scale={[scale * 2, scale * 0.5, scale]}
    >
      <meshStandardMaterial
        color="#ff69b4"
        metalness={0.4}
        roughness={0.6}
        emissive="#ff1493"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

const Flower = ({ 
  initialPosition, 
  accumulatedPosition, 
  delay 
}: { 
  initialPosition: [number, number, number];
  accumulatedPosition: [number, number, number];
  delay: number;
}) => {
  const flowerRef = useRef<THREE.Group>(null);
  const phaseRef = useRef<'blooming' | 'rising' | 'falling' | 'accumulated'>('blooming');
  const fallStartTimeRef = useRef(0);
  
  useFrame((state) => {
    if (flowerRef.current) {
      const time = state.clock.elapsedTime - delay;
      
      if (time > 0) {
        if (phaseRef.current === 'blooming') {
          // Blooming animation
          const bloomScale = Math.min(time * 1.5, 1);
          flowerRef.current.scale.setScalar(bloomScale);
          
          if (bloomScale >= 1) {
            phaseRef.current = 'rising';
          }
        } else if (phaseRef.current === 'rising') {
          // Rising with swaying motion
          flowerRef.current.position.y = initialPosition[1] + (time - 0.7) * 0.35;
          flowerRef.current.position.x = initialPosition[0] + Math.sin(time * 1.5) * 0.2;
          flowerRef.current.position.z = initialPosition[2] + Math.cos(time * 1.5) * 0.2;
          
          // Natural rotation
          flowerRef.current.rotation.y = time * 0.3;
          flowerRef.current.rotation.z = Math.sin(time * 2) * 0.1;
          
          // Start falling after reaching peak
          if (flowerRef.current.position.y > 2.5) {
            phaseRef.current = 'falling';
            fallStartTimeRef.current = state.clock.elapsedTime;
          }
        } else if (phaseRef.current === 'falling') {
          // Falling with natural motion
          const fallTime = state.clock.elapsedTime - fallStartTimeRef.current;
          const gravity = -1.5;
          
          flowerRef.current.position.y = 2.5 + gravity * fallTime * fallTime * 0.5;
          flowerRef.current.position.x = THREE.MathUtils.lerp(flowerRef.current.position.x, accumulatedPosition[0], 0.03);
          flowerRef.current.position.z = THREE.MathUtils.lerp(flowerRef.current.position.z, accumulatedPosition[2], 0.03);
          
          // Spinning while falling
          flowerRef.current.rotation.y += 0.05;
          flowerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2;
          
          // Land softly
          if (flowerRef.current.position.y <= accumulatedPosition[1]) {
            flowerRef.current.position.y = accumulatedPosition[1];
            phaseRef.current = 'accumulated';
          }
        } else if (phaseRef.current === 'accumulated') {
          // Gentle swaying on ground
          flowerRef.current.position.y = accumulatedPosition[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.06;
          flowerRef.current.rotation.y += 0.002;
          flowerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.05;
        }
      }
    }
  });
  
  return (
    <group ref={flowerRef} position={initialPosition} scale={0}>
      {/* Flower Center */}
      <Sphere args={[0.05]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
          emissive="#ffd700"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Petals */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const petalPosition: [number, number, number] = [
          Math.cos(angle) * 0.15,
          0,
          Math.sin(angle) * 0.15
        ];
        const petalRotation: [number, number, number] = [0, angle, 0];
        
        return (
          <FlowerPetal
            key={i}
            position={petalPosition}
            rotation={petalRotation}
            scale={1}
          />
        );
      })}
      
      {/* Stem */}
      <Cylinder args={[0.01, 0.02, 0.3]} position={[0, -0.15, 0]}>
        <meshStandardMaterial
          color="#228b22"
          metalness={0.2}
          roughness={0.8}
        />
      </Cylinder>
    </group>
  );
};

export const Flowers = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const flowersRef = useRef<Array<{
    id: number;
    initialPosition: [number, number, number];
    accumulatedPosition: [number, number, number];
    delay: number;
  }>>([]);
  const nextFlowerIdRef = useRef(0);
  
  // Initialize first batch of flowers
  const initialFlowers = useMemo(() => {
    const flowers = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      initialPosition: [
        (Math.random() - 0.5) * 2.5,
        Math.random() * 1.5,
        (Math.random() - 0.5) * 2.5
      ] as [number, number, number],
      accumulatedPosition: [
        (Math.random() - 0.5) * 5,
        -1.8,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      delay: i * 0.6 + 1,
    }));
    flowersRef.current = flowers;
    nextFlowerIdRef.current = flowers.length;
    return flowers;
  }, []);
  
  // Add new flowers continuously
  useFrame((state) => {
    const currentTime = state.clock.elapsedTime;
    
    // Add a new flower every 3 seconds
    if (currentTime > 10 && Math.floor(currentTime) % 3 === 0 && Math.floor(currentTime * 10) % 10 === 0) {
      const newFlower = {
        id: nextFlowerIdRef.current++,
        initialPosition: [
          (Math.random() - 0.5) * 2.5,
          Math.random() * 1.5,
          (Math.random() - 0.5) * 2.5
        ] as [number, number, number],
        accumulatedPosition: [
          (Math.random() - 0.5) * 6,
          -1.8,
          (Math.random() - 0.5) * 6
        ] as [number, number, number],
        delay: currentTime,
      };
      
      flowersRef.current = [...flowersRef.current, newFlower];
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {flowersRef.current.map((flower) => (
        <Flower
          key={flower.id}
          initialPosition={flower.initialPosition}
          accumulatedPosition={flower.accumulatedPosition}
          delay={flower.delay}
        />
      ))}
    </group>
  );
};