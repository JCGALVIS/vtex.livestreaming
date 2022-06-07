import IconClose from '@vtex/styleguide/lib/icon/Close'
import React, { Fragment } from 'react'
import { CSSTransition, Transition } from 'react-transition-group'
import styles from './productSlider.css'
import { VerticalProductSlider } from './VerticalProductSlider'

type SliderProductMobileProps = {
  height: string
  showSliderProducts: boolean
  setShowSliderProducts: React.Dispatch<React.SetStateAction<boolean>>
  variationSelectorState: [string, React.Dispatch<React.SetStateAction<string>>]
}

export const SliderProductMobile = ({
  height,
  showSliderProducts,
  setShowSliderProducts,
  variationSelectorState
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
                  height={(parseInt(height) + 50).toString()}
                  variationSelectorState={variationSelectorState}
                />
              </div>
            </div>
          </div>
        </Fragment>
      </CSSTransition>
    </Transition>
  )
}
