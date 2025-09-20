import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { GiftBox } from './GiftBox';
import { AuroraBackground } from './AuroraBackground';
import { ParticleSystem } from './ParticleSystem';
import { RomanticText } from './RomanticText';

export const ValentinesScene = () => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Aurora Background Effect */}
      <AuroraBackground />
      
      {/* 3D Scene */}
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} color="#ff69b4" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff1493" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />
        
        <Suspense fallback={null}>
          <GiftBox onContentsShow={() => setShowText(true)} />
          <ParticleSystem />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Romantic Text Overlay - Only show after clicking */}
      {showText && <RomanticText />}
    </div>
  );
};