import React, { Fragment } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { VerticalProductSlider } from './VerticalProductSlider'

import styles from './productSlider.css'

type SliderProductMobileProps = {
  collectionId: string | undefined
  height: string
  showSliderProducts: boolean
  setShowSliderProducts: React.Dispatch<React.SetStateAction<boolean>>
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SliderProductMobile = ({
  collectionId,
  height,
  showSliderProducts,
  setShowSliderProducts,
  setShowVariation,
  setLoading
}: SliderProductMobileProps) => {
  return (
    <Transition in={showSliderProducts} timeout={150}>
      <CSSTransition
        in={showSliderProducts}
        timeout={100}
        classNames={styles.slide}
        unmountOnExit
      >
        <Fragment>
          <div
            className={styles.sliderProductMobileContainer}
            onClick={() => setShowSliderProducts(false)}
          />
          <div className={styles.sliderProductMobileContent}>
            <div style={{ overflow: 'hidden' }}>
              <div className={styles.closeContent}>
                <button
                  className={styles.buttonClose}
                  onClick={() => setShowSliderProducts(false)}
                >
                  <IconClose />
                </button>
              </div>
              <div>
                <VerticalProductSlider
                  collectionId={collectionId}
                  height={(parseInt(height) + 50).toString()}
                  setShowVariation={setShowVariation}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        </Fragment>
      </CSSTransition>
    </Transition>
  )
}
