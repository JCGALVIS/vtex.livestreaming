import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import cloneDeep from 'lodash.clonedeep';

import style from './index.module.css';
import Burst from '../../../assets/animations/Burst.json';

interface Props {
  canvas: React.RefObject<HTMLCanvasElement> | null;
  message: string;
  forceMobile: boolean;
  preview: boolean;
}
const PromotionsNotification: React.FC<Props> = ({
  message,
  forceMobile = false,
  preview = false,
}) => {
  const playerRef = useRef<Player>(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 6000);

    return () => {
      if (!playerRef?.current) return;
      playerRef?.current.stop();
    };
  }, [playerRef]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
      className={forceMobile ? style.mobile : ''}
    >
      <div className={style.animation2}>
        {showAnimation && (
          <div className={style.moveToRight}>
            <Player
              ref={playerRef}
              src={preview ? cloneDeep(Burst) : Burst}
              autoplay
              loop
              renderer="svg"
            />
          </div>
        )}
        {!showAnimation && (
          <div className={style.animation2frame}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 694.38 305.27">
              <defs />
              <g id="Capa_2" data-name="Capa 2">
                <g id="Capa_1-2" data-name="Capa 1">
                  <polygon
                    style={{ fill: '#774695' }}
                    className="cls-1"
                    points="694.38 35.85 694.38 35.85 10.36 71.69 0 269.42 684.02 233.57 694.38 35.85"
                  />
                  <polygon
                    style={{ fill: '#4f2583' }}
                    className="cls-2"
                    points="694.38 35.85 458.37 0 460.88 48.08 694.38 35.85"
                  />
                  <polygon
                    style={{ fill: '#4f2583' }}
                    className="cls-2"
                    points="0 269.42 236.01 305.27 233.5 257.19 0 269.42"
                  />
                </g>
              </g>
            </svg>
            <div className={style.text}>{message}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionsNotification;
