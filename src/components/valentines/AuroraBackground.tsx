import { useEffect, useState } from 'react';

export const AuroraBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Aurora layers */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 animate-aurora"
          style={{
            background: 'linear-gradient(45deg, transparent, hsl(var(--aurora-pink) / 0.4), transparent, hsl(var(--aurora-purple) / 0.4), transparent)',
            filter: 'blur(20px)',
          }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 animate-aurora"
          style={{
            background: 'linear-gradient(-45deg, transparent, hsl(var(--aurora-blue) / 0.3), transparent, hsl(var(--aurora-pink) / 0.3), transparent)',
            filter: 'blur(30px)',
            animationDelay: '2s',
            animationDuration: '10s',
          }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0 animate-aurora"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-purple) / 0.2), transparent, hsl(var(--aurora-blue) / 0.2), transparent)',
            filter: 'blur(40px)',
            animationDelay: '4s',
            animationDuration: '12s',
          }}
        />
      </div>
      
      {/* Subtle sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-romantic-gold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
};