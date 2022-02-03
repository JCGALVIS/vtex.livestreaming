import React, { useEffect, useRef, useState, useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ProductItem } from './ProductItem'
import { ActionsContext, SettingContext } from '../../context'
import { useFetchProducts } from './../../hooks/useFetchProducts'
import { getDeviceType } from '../../utils'

import styles from './productSlider.css'

type VerticalProductSliderProps = {
  height: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType?: string | undefined
}

export const VerticalProductSlider = ({
  height,
  setShowVariation,
  transmitionType
}: VerticalProductSliderProps) => {
  const { collectionId, isModalLive } = useContext(SettingContext)
  const isMobile = getDeviceType() === 'mobile'

  const {
    setting: { isInfinite, time }
  } = useContext(ActionsContext)

  const { data: products, loading } = useFetchProducts({
    collectionId
  })

  console.log('products: ', products)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const delay = time ? time * 1000 : 10000
  const [indexScroll, setIndexScroll] = useState(0)
  const productLisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading) return
    if (!isInfinite) return
    if (!productLisRef?.current) return
    if (isMouseOver) return

    const current = productLisRef?.current

    const productDivs = current.children

    const timeout = setTimeout(() => {
      if (indexScroll === 0) {
        current.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      } else {
        current.scrollBy({
          top: productDivs[indexScroll - 1].clientHeight + 10,
          left: 0,
          behavior: 'smooth'
        })
      }

      setIndexScroll(
        indexScroll === productDivs.length - 1 ? 0 : indexScroll + 1
      )
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [indexScroll, isInfinite, delay, isMouseOver, loading])

  useEffect(() => {
    if (!productLisRef.current) return
    productLisRef.current.addEventListener('mouseover', () => {
      setIsMouseOver(true)
    })
    productLisRef.current.addEventListener('mouseout', () => {
      setIsMouseOver(false)
    })

    return () => {}
  }, [productLisRef])

  return !loading ? (
    <div
      className={styles.verticalProductSliderContent}
      style={
        isModalLive && transmitionType === 'vertical' && !isMobile
          ? { maxWidth: 390, minWidth: 390 }
          : {}
      }
    >
      <div className={styles.verticalProductSliderTitle}>
        <p className={styles.title}>
          <FormattedMessage id='store/text.products' />
        </p>
      </div>
      <div
        style={{ height: parseInt(height) }}
        className={styles.productList}
        ref={productLisRef}
        id='product-list'
      >
        {products &&
          products.length > 0 &&
          products.map((product: any) => (
            <ProductItem
              key={product.id}
              {...product}
              setShowVariation={setShowVariation}
              sectionIdClickedOn='live_shopping_sidebar'
            />
          ))}
      </div>
    </div>
  ) : null
}
