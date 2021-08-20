import React from 'react'

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
      Productos
    </button>
  ) : null
}
