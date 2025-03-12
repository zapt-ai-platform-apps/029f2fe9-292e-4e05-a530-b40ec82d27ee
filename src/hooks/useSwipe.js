import { useState, useRef } from 'react';
import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function useSwipe(pagesCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const draggingRef = useRef(false);
  
  // Spring for smooth sliding animation
  const [{ x }, api] = useSpring(() => ({ 
    x: 0,
    config: { tension: 300, friction: 30 }
  }));
  
  // Create gesture handler
  const bind = useDrag(({ movement: [mx], last, direction: [xDir], velocity: [vx] }) => {
    draggingRef.current = true;
    
    // If it's last drag event, calculate whether to advance slide or return to current
    if (last) {
      draggingRef.current = false;
      const threshold = window.innerWidth * 0.15; // 15% of screen width
      const willSlide = Math.abs(mx) > threshold || vx > 0.3;
      
      // If we're sliding, determine direction
      if (willSlide) {
        const nextIndex = xDir < 0
          ? Math.min(activeIndex + 1, pagesCount - 1) // Forward
          : Math.max(activeIndex - 1, 0); // Backward
        
        // Update index
        if (nextIndex !== activeIndex) {
          setActiveIndex(nextIndex);
        }
        
        // Animate to the next position
        api.start({ x: -nextIndex * window.innerWidth });
      } else {
        // Return to current position
        api.start({ x: -activeIndex * window.innerWidth });
      }
    } else {
      // While dragging, track position
      api.start({ 
        x: -activeIndex * window.innerWidth + mx,
        immediate: true 
      });
    }
  }, {
    // Only drag horizontally
    axis: 'x',
    // Bounds for dragging
    bounds: { left: -(pagesCount - 1) * window.innerWidth, right: 0 },
    // Rubberband effect at the boundaries
    rubberband: true,
  });
  
  // Function to navigate to a specific page
  const navigateTo = (index) => {
    if (index >= 0 && index < pagesCount) {
      setActiveIndex(index);
      api.start({ x: -index * window.innerWidth });
    }
  };
  
  return {
    activeIndex,
    navigateTo,
    bind,
    style: { x }
  };
}