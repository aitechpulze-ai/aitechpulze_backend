import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import './Dock.css';

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  direction = 'horizontal'
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(direction === 'horizontal' ? mouseX : mouseY, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: baseItemSize,
      height: baseItemSize
    };
    return direction === 'horizontal' 
      ? val - rect.x - baseItemSize / 2
      : val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', direction = 'horizontal', ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  const labelProps = direction === 'horizontal' 
    ? {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: -10 },
        exit: { opacity: 0, y: 0 },
        style: { x: '-50%', left: '50%', top: '-1.8rem' }
      }
    : {
        initial: { opacity: 0, x: 0 },
        animate: { opacity: 1, x: -10 },
        exit: { opacity: 0, x: 0 },
        style: { y: '-50%', top: '50%', right: '100%', left: 'auto', marginRight: '8px' }
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...labelProps}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
  direction = 'horizontal' // 'horizontal' or 'vertical'
}) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  
  // Dynamic dimensions based on direction
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const animatedSize = useSpring(heightRow, spring);

  const containerStyle = direction === 'horizontal' 
    ? { height: animatedSize }
    : { width: animatedSize };

  return (
    <motion.div 
      style={{ ...containerStyle, scrollbarWidth: 'none' }} 
      className={`dock-outer ${direction === 'vertical' ? 'dock-outer-vertical' : ''}`}
    >
      <motion.div
        onMouseMove={({ pageX, pageY }) => {
          isHovered.set(1);
          mouseX.set(pageX);
          mouseY.set(pageY);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
          mouseY.set(Infinity);
        }}
        className={`dock-panel ${direction === 'vertical' ? 'dock-panel-vertical' : ''} ${className}`}
        style={direction === 'horizontal' ? { height: panelHeight } : { width: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
            direction={direction}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel direction={direction}>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
