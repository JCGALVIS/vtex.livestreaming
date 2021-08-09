import React from 'react'

import styles from './productSlider.css'

export const VerticalProductSlider = () => {
  return (
    <div className={styles.verticalProductSliderContent}>
      <div className={styles.verticalProductSliderTitle}>
        <h1 className={styles.title}>Productos</h1>
      </div>
      <div>
        <div className={styles.pictureContent}>
          <img
            className={styles.productPicture}
            src='https://livestreamingdemo.vteximg.com.br/arquivos/ids/155407/laptop.jpg?v=637564987744270000'
          />
        </div>
        <div>
          <h4>Laptop</h4>
          <span>De $ 10.000,00</span>
          <span>Para $ 5.00,00</span>
          <div className={styles.productAddCartContent}>
            <a className={styles.productAddCart}>Ver</a>
            <div>
              <a id='add-cart' target='_blank' rel='noreferrer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
