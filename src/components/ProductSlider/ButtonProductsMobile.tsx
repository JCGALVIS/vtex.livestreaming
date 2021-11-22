import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from './productSlider.css'

type SliderProductsMobileProps = {
  collectionId: string | undefined
  setShowSliderProducts: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonProductsMobile = ({
  collectionId,
  setShowSliderProducts
}: SliderProductsMobileProps) => {
  return collectionId ? (
    <button
      className={styles.buttonMobile}
      onClick={() => setShowSliderProducts(true)}
    >
      <FormattedMessage id='store/text.live-products' />
    </button>
  ) : null
}
