import React, { useEffect, useRef, useState, useContext } from 'react';

import { SettingContext } from '../../../context';
import styles from './heart.module.css';

interface HeartProps {
  color: string;
  removeHeart: () => void;
}

const Heart = (props: HeartProps) => {
  const { color, removeHeart } = props;
  const { infoSocket } = useContext(SettingContext);

  const { queueSocket } = infoSocket || {};

  const [done, setDone] = useState(false);

  const animationReqId = useRef<number>();

  const outerRef = useRef<HTMLDivElement>(null);

  const styleRef = (el: HTMLDivElement) =>
    el ? el.style.setProperty('width', '30px', 'important') : null;

  useEffect(() => {
    let x = parseFloat('12');
    let y = parseFloat('12');

    let phase = Math.random() * 360;
    const radius = Math.random() * 1;
    const speed = 1 + Math.random() * 2;
    const scale = 0.2 + Math.random() * 0.8;
    let grow = 0.01;
    let alpha = 1;

    const draw = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(0) scale(${grow})`;
        outerRef.current.style.opacity = alpha.toString();
      }
    };

    const update = () => {
      if (alpha > 0) {
        alpha -= 0.009;
      }

      if (alpha < 0) {
        alpha = 0;
      }

      x += Math.cos(phase / 20) * radius;
      y -= speed;

      grow += (scale - grow) / 10;
      phase += 1;

      const isDone = y < -500 || alpha <= 0;

      setDone(isDone);
    };

    const loop = () => {
      animationReqId.current = requestAnimationFrame(loop);

      update();
      draw();
    };

    loop();

    return () => {
      if (animationReqId.current) {
        cancelAnimationFrame(animationReqId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!done) return;

    if (animationReqId.current) {
      cancelAnimationFrame(animationReqId.current);
    }

    removeHeart();

    // eslint-disable-next-line no-unused-expressions
    if (queueSocket) queueSocket?.remove();
  }, [done, removeHeart, queueSocket]);

  return (
    <div className={styles.heartOuter} ref={outerRef}>
      <div
        className={styles.heartInner}
        ref={styleRef}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default Heart;
