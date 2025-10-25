import { useEffect, useRef, useState } from 'react';

export function useContainerDimensions() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 790 });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        setDimensions({
          width: offsetWidth || 800,
          height: offsetHeight || 790,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return { ref, dimensions };
}