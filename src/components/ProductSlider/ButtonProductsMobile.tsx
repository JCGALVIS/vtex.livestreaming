import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { SettingContext } from '../../context'

import styles from './productSlider.css'

type SliderProductsMobileProps = {
  setShowSliderProducts: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonProductsMobile = ({
  setShowSliderProducts
}: SliderProductsMobileProps) => {
  const { collectionId, showCarouselChatButton } = useContext(SettingContext)

  return collectionId && !showCarouselChatButton ? (
    <button
      className={styles.buttonMobile}
      onClick={() => setShowSliderProducts(true)}
    >
      <FormattedMessage id='store/text.live-products' />
    </button>
  ) : null
}
