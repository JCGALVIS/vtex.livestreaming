/* eslint-disable no-unused-vars */
import { useRef, useState, useMemo, useLayoutEffect } from 'react'

import type { Dimensions, StreamPlayerType } from '../typings/MediaPlayer'
import { getDeviceType } from '../utils'

const initialDimensions: Dimensions = {
  width: 0,
  height: 0
}

const usePlayerLayout = (transmitionType: string | undefined) => {
  const videoEl = useRef<StreamPlayerType>(null)
  const mainContainer = useRef<HTMLDivElement>(null)

  const [windowDimensions, setWindowDimensions] =
    useState<Dimensions>(initialDimensions)

  const isVerticalLayout = useMemo(() => {
    const type = transmitionType || 'horizontal'

    return type === 'vertical'
  }, [transmitionType])

  const containerDimensions = useMemo(() => {
    const isMobile = windowDimensions.width <= 640

    switch (true) {
      case isMobile:
        return {
          height: 450 ?? 0,
          width: '100%'
        }

      case !isMobile && !isVerticalLayout:
        return {
          height: (1080 / 1920) * (windowDimensions.width * 0.445),
          width: '100%'
        }

      case !isMobile && isVerticalLayout:
        // eslint-disable-next-line no-case-declarations
        const height = 495

        return {
          height,
          width: (1080 / 1920) * height
        }

      default:
        return {
          height: 0,
          width: 0
        }
    }
  }, [isVerticalLayout, windowDimensions])

  useLayoutEffect(() => {
    const dimensionSetter = () => {
      const { clientHeight: height, clientWidth: width } =
        document.documentElement

      if (
        getDeviceType() === 'mobile' &&
        (document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'input')
      ) {
        return
      }

      setWindowDimensions({
        width,
        height
      })
    }

    dimensionSetter()
    window.addEventListener('resize', dimensionSetter)

    return () => window.removeEventListener('resize', () => {})
  }, [])

  return {
    containerDimensions,
    isVerticalLayout,
    mainContainer,
    videoEl,
    windowDimensions
  }
}

export default usePlayerLayout
