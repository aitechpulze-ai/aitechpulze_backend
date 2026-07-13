import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const dot  = dotRef.current;
    const rng  = ringRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      rng.style.left = ring.current.x + 'px';
      rng.style.top  = ring.current.y + 'px';
      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = (e) => {
      rng.classList.add('hovering');
      const label = e.target.dataset.cursorLabel;
      if (label) rng.setAttribute('data-label', label);
    };
    const onLeave = () => {
      rng.classList.remove('hovering');
      rng.removeAttribute('data-label');
    };

    const onDown = () => {
      rng.classList.add('clicking');
      dot.style.transform = 'translate(-50%,-50%) scale(0.5)';
      // ripple
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:fixed;left:${pos.current.x}px;top:${pos.current.y}px;width:10px;height:10px;border-radius:50%;background:rgba(37,99,235,0.25);transform:translate(-50%,-50%) scale(0);pointer-events:none;z-index:9997;animation:ripple .6s ease-out forwards;`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    const onUp = () => {
      rng.classList.remove('clicking');
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    const targets = document.querySelectorAll('a,button,[data-cursor]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
