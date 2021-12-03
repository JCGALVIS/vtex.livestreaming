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
  const { collectionId } = useContext(SettingContext)

  return collectionId ? (
    <button
      className={styles.buttonMobile}
      onClick={() => setShowSliderProducts(true)}
    >
      <FormattedMessage id='store/text.live-products' />
    </button>
  ) : null
}
