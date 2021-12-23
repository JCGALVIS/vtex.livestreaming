import { useEffect, useState } from 'react'
import { getProducts } from '../services'
import { HighlightProduct } from './../typings/livestreaming'
import { useLivestreamingContext } from '../context'
import { useShowHightlightsForFinishedEvents } from './useShowHightlightsForFinishedEvents'

type useHighlightProductProps = {
  highlightProduct: HighlightProduct | undefined
  collectionId: string | undefined
  originOfProducts: string | undefined
  isFinalized: boolean
}

export const useHighlightProduct = ({
  highlightProduct,
  collectionId,
  originOfProducts,
  isFinalized
}: useHighlightProductProps) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: 0,
    priceWithDiscount: 0,
    imageUrl: '',
    addToCartLink: '',
    isAvailable: true,
    variationSelector: [],
    pdpLink: ''
  })
  const [showProduct, setShowProduct] = useState<boolean | undefined>(false)
  const { account, host } = useLivestreamingContext()

  const handleSetProduct = (productId: string, storageProducts: string) => {
    const products = JSON.parse(storageProducts)

    const product = products.find(
      (product: { id: string | undefined }) => product.id === productId
    )

    if (product) {
      setProduct({
        id: product?.id,
        name: product?.name,
        priceWithDiscount: product?.priceWithDiscount,
        price: product?.price,
        imageUrl: product?.imageUrl,
        addToCartLink: product?.addToCartLink,
        isAvailable: product?.isAvailable,
        variationSelector: product?.variationSelector,
        pdpLink: product?.pdpLink
      })
    }
  }

  useShowHightlightsForFinishedEvents(
    handleSetProduct,
    setShowProduct,
    isFinalized
  )

  useEffect(() => {
    if (highlightProduct?.backgroundWhiteHighlight) return

    if (highlightProduct && !highlightProduct?.showProduct)
      localStorage.removeItem('product')

    const dataProduct = {
      productId: highlightProduct?.productId,
      showProduct: highlightProduct?.showProduct,
      collection: highlightProduct?.collection,
      idLivestreaming: highlightProduct?.livestreamingId
    }

    if (highlightProduct)
      localStorage.setItem('product', JSON.stringify(dataProduct))

    const storageProducts = localStorage.getItem('products')
    const storageProduct = localStorage.getItem('product')
    const storageCollectionId = localStorage.getItem('collectionId')

    if (
      collectionId &&
      (!storageCollectionId || collectionId !== storageCollectionId)
    ) {
      localStorage.setItem('collectionId', collectionId)

      getProducts({ collectionId, originOfProducts, account, host }).then(
        (data: any) => {
          if (data && data.length > 0) {
            localStorage.setItem('products', JSON.stringify(data))
          }
        }
      )
    }

    const objetProduct = storageProduct && JSON.parse(storageProduct)
    const isShowProduct = objetProduct
      ? objetProduct.showProduct
      : highlightProduct?.showProduct

    if (storageProducts && isShowProduct) {
      const productId = objetProduct.productId || highlightProduct?.productId
      handleSetProduct(productId, storageProducts)

      if (product) setShowProduct(isShowProduct)
    } else {
      setShowProduct(isShowProduct)
    }
  }, [collectionId, highlightProduct])

  return { product, showProduct }
}
