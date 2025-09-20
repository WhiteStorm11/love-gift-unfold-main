import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { Hearts } from './Hearts';
import { Flowers } from './Flowers';

export const GiftBox = ({ onContentsShow }: { onContentsShow?: () => void }) => {
  const boxRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showContents, setShowContents] = useState(false);

  const handleClick = () => {
    if (!isOpening) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpen(true);
        setShowContents(true);
        onContentsShow?.();
      }, 2000);
    }
  };

  useFrame((state) => {
    if (boxRef.current) {
      // Gentle floating animation
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Vibration before opening
      if (!isOpening) {
        const vibration = Math.sin(state.clock.elapsedTime * 20) * 0.01;
        boxRef.current.rotation.z = vibration;
      }
      
      // Gentle rotation
      boxRef.current.rotation.y += 0.005;
    }

    // Lid opening animation
    if (lidRef.current && isOpening) {
      const targetRotation = isOpen ? -Math.PI / 3 : 0;
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        targetRotation,
        0.02
      );
    }
  });

  return (
    <group ref={boxRef} position={[0, 0, 0]} onClick={handleClick}>
      {/* Box Base */}
      <RoundedBox
        args={[2, 1.5, 2]}
        radius={0.1}
        smoothness={4}
        position={[0, -0.75, 0]}
      >
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.8}
          roughness={0.2}
          emissive="#450a0a"
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Box Lid */}
      <RoundedBox
        ref={lidRef}
        args={[2.1, 0.3, 2.1]}
        radius={0.1}
        smoothness={4}
        position={[0, 0.15, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.8}
          roughness={0.2}
          emissive="#450a0a"
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Bow */}
      <group position={[0, 0.3, 0]}>
        {/* Bow Center */}
        <Box args={[0.3, 0.2, 0.3]}>
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.9}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Bow Left */}
        <Box args={[0.4, 0.1, 0.6]} position={[-0.4, 0, 0]} rotation={[0, 0, 0.3]}>
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.9}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Bow Right */}
        <Box args={[0.4, 0.1, 0.6]} position={[0.4, 0, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.9}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.2}
          />
        </Box>
      </group>

      {/* Interior Glow */}
      {isOpen && (
        <pointLight
          position={[0, -0.5, 0]}
          intensity={2}
          color="#ffd700"
          distance={3}
          decay={2}
        />
      )}

      {/* Contents */}
      {showContents && (
        <>
          <Hearts position={[0, 0, 0]} />
          <Flowers position={[0, 0, 0]} />
        </>
      )}
    </group>
  );
};