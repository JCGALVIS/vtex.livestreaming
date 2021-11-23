import React, { useEffect, useRef, useState, useContext } from 'react'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from './../../hooks/useFetchProducts'
import { FormattedMessage } from 'react-intl'

import styles from './productSlider.css'
import { ActionsContext } from '../../context/ActionsContext'

type VerticalProductSliderProps = {
  collectionId: string | undefined
  height: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const VerticalProductSlider = ({
  collectionId,
  height,
  setShowVariation,
  setLoading
}: VerticalProductSliderProps) => {
  const {
    setting: { isInfinite, originOfProducts, time }
  } = useContext(ActionsContext)

  const { data: products, loading } = useFetchProducts({
    collectionId,
    originOfProducts
  })
  const [isMouseOver, setIsMouseOver] = useState(false)
  const delay = time ? time * 1000 : 10000
  const [indexScroll, setIndexScroll] = useState(0)
  const productLisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoading(loading)
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
    <div className={styles.verticalProductSliderContent}>
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
        {products.length > 0 &&
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
