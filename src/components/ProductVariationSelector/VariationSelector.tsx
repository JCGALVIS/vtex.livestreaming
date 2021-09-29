import React, { Fragment, useEffect, useState } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { NumericStepper } from '../commonComponents'
import InfoIcon from '../icons/Info'
import styles from './variationSelector.css'

type VariationSelectorProps = {
  showVariation: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}

export const VariationSelector = (props: VariationSelectorProps) => {
  const [show, setShow] = useState(false)

  const { showVariation, setShowVariation } = props

  useEffect(() => {
    if (showVariation) setShow(true)
  }, [showVariation])

  const handleClose = () => {
    setShow(false)
    setShowVariation('')
  }

  return (
    <Transition in={show} timeout={150}>
      <CSSTransition in={show} timeout={100} unmountOnExit>
        <Fragment>
          <div className={styles.variationSelector}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.icon}>
                    <InfoIcon size='36' viewBox='0 0 24 24' />
                  </div>
                  <span className={styles.infoText}>
                    Selecciona tu opcion para agregar el producto al carrito
                  </span>
                  <button className={styles.closeCardBtn} onClick={handleClose}>
                    <IconClose />
                  </button>
                </div>
                <div className={styles.productDetail}>
                  <div className={styles.productPictureContainer}>
                    <img
                      className={styles.productPicture}
                      src='https://livestreamingdemo.vteximg.com.br/arquivos/ids/155396/chaqueta.jpg?v=637564691199270000'
                    />
                  </div>
                  <div className={styles.productDetailInfo}>
                    <div className={styles.productContainer}>
                      <div className={styles.productInfo}>
                        <h2 className={styles.productTitle}>Chaqueta</h2>
                        <span>
                          <span className={styles.productPrice}>
                            $ 10.000,00
                          </span>
                          <span className={styles.productSavingPrice}>
                            {' '}
                            Ahorre $ 5.000,00
                          </span>
                        </span>
                        <span className={styles.productDiscountPrice}>
                          $ 5.000,00
                        </span>
                        <span>Hata 1 x $5.000,00 sin interés</span>
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <span className={styles.titleVariation}>
                          Seleccionar talla:
                        </span>
                        <div className={styles.itemContent}>
                          <div className={styles.itemSize}>
                            <div className={styles.itemSizeSelect} />
                            <div>
                              <span>XS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.variationContent}>
                        <span className={styles.titleVariation}>Color:</span>
                        <div className={styles.itemContent}>
                          <div className={styles.itemColor}>
                            <div className={styles.itemColorSelect} />
                            <div>
                              <img
                                className={styles.productPictureColor}
                                src='https://livestreamingdemo.vteximg.com.br/arquivos/ids/155396/chaqueta.jpg?v=637564691199270000'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <NumericStepper />
                        <div className={styles.buttonGroup}>
                          <button className={styles.productButton}>
                            Agregar a su carrito
                          </button>
                          <a
                            className={`${styles.productButton} ${styles.buttonPdp}`}
                          >
                            Agregar a su carrito
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.backdropContainer} onClick={handleClose} />
          </div>
        </Fragment>
      </CSSTransition>
    </Transition>
  )
}
