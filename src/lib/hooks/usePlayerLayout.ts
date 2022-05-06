/* eslint-disable no-unused-vars */
import { useRef, useState, useMemo, useLayoutEffect } from 'react';

import type { Dimensions, StreamPlayerType } from '../../typings/MediaPlayer';
import { getDeviceType } from '../utils';

const initialDimensions: Dimensions = {
  width: 0,
  height: 0,
};

const usePlayerLayout = (transmitionType: string | undefined) => {
  const videoEl = useRef<StreamPlayerType>(null);
  const mainContainer = useRef<HTMLDivElement>(null);

  const [windowDimensions, setWindowDimensions] =
    useState<Dimensions>(initialDimensions);

  const isVerticalLayout = useMemo(() => {
    const type = transmitionType || 'horizontal';

    return type === 'vertical';
  }, [transmitionType]);

  useLayoutEffect(() => {
    const dimensionSetter = () => {
      const { clientHeight: height, clientWidth: width } =
        document.documentElement;

      if (
        getDeviceType() === 'mobile' &&
        (document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'input')
      ) {
        return;
      }

      setWindowDimensions({
        width,
        height,
      });
    };

    dimensionSetter();
    window.addEventListener('resize', dimensionSetter);

    return () => window.removeEventListener('resize', () => {});
  }, []);

  return {
    isVerticalLayout,
    mainContainer,
    videoEl,
    windowDimensions,
  };
};

export default usePlayerLayout;
