import { useEffect, useState } from 'react';

export const RomanticText = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 6000); // Show text after the box opens

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center">
        <h1 
          className={`
            text-4xl md:text-6xl lg:text-7xl font-bold text-romantic-gold
            transition-all duration-2000 ease-out animate-text-glow
            ${showText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}
          `}
          style={{
            fontFamily: 'serif',
            textShadow: '0 0 10px hsl(var(--romantic-gold)), 0 0 20px hsl(var(--romantic-gold)), 0 0 30px hsl(var(--romantic-gold))',
            background: 'var(--gradient-gold)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Feliz Día del
        </h1>
        <h2 
          className={`
            text-3xl md:text-5xl lg:text-6xl font-bold text-romantic-pink
            transition-all duration-2000 ease-out delay-500 animate-text-glow
            ${showText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}
          `}
          style={{
            fontFamily: 'serif',
            textShadow: '0 0 8px hsl(var(--romantic-pink)), 0 0 16px hsl(var(--romantic-pink))',
            background: 'var(--gradient-romantic)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Amor y la Amistad
        </h2>
        
        {/* Decorative hearts */}
        <div className="flex justify-center gap-4 mt-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={`
                text-2xl text-romantic-red animate-pulse
                transition-all duration-1000 ease-out
                ${showText ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'}
              `}
              style={{
                animationDelay: `${1 + i * 0.2}s`,
                filter: 'drop-shadow(0 0 5px hsl(var(--romantic-red)))',
              }}
            >
              ♥
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};