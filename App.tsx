import React, { useState, useEffect } from 'react';
import Eye from './components/Eye';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });

      const target = event.target as HTMLElement;
      if (
        target.closest(
          'button, a, [role="button"], input, textarea, select'
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = () => {
      setClickCount((prev) => prev + 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen w-full select-none bg-gradient-radial from-gray-50 to-gray-200">
      <CustomCursor position={mousePosition} isHovering={isHovering} />
      <div className="flex gap-10">
        <Eye mousePosition={mousePosition} clickCount={clickCount} />
        <Eye mousePosition={mousePosition} clickCount={clickCount} />
      </div>
    </div>
  );
};

export default App;
