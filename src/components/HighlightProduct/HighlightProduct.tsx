import React, { useState, Fragment, useEffect, useRef } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import { useHighlightProduct } from '../../hooks/useHighlightProduct'
import styles from './highlightProduct.css'

interface HighlightProductProps {
  infoSocket: InfoSocket
  collectionId: string | undefined
}

const HighlightProduct = ({
  infoSocket,
  collectionId
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const { ivsRealTime, highlightProduct } = infoSocket
  const divProduct = useRef<HTMLDivElement>(null)

  const { product, showProduct, handlerCloseCard } = useHighlightProduct({
    highlightProduct,
    collectionId
  })

  const addToCart = () => {
    if (divProduct.current) {
      const productId = divProduct.current.id
      const item = {
        id: productId,
        quantity: 1,
        seller: '1'
      }
      window.vtexjs.checkout
        .addToCart([item], null)
        .done(function (orderForm: any) {
          alert('Item adicionado!')
          console.log(orderForm)
        })
    }
  }

  useEffect(() => {
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setShow(showProduct)
      return
    }
    setShow(false)
  }, [ivsRealTime, showProduct])

  return (
    <Fragment>
      {show ? (
        <div
          className={styles.highlightProductContainer}
          id='highlightProductContainer'
        >
          <button className={styles.closeCardBtn} onClick={handlerCloseCard}>
            <IconClose />
          </button>
          <div className={styles.productContainer}>
            <img className={styles.productPicture} src={product.imageUrl} />
            <div className={styles.productInfo}>
              <p className={styles.productTitle}>{product.name}</p>
              <div className={styles.productPriceContainer}>
                <div>
                  <p className={styles.productDiscounted}>
                    $ {product.priceWithDiscount}
                  </p>
                  <p className={styles.productPrice}>$ {product.price}</p>
                </div>
                <div className={styles.productAddCartContent}>
                  <a className={styles.productAddCart} onClick={addToCart}>
                    Agregar
                  </a>
                  <div ref={divProduct} id={product.id}>
                    <a id='add-cart' href={product.addToCartLink} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
