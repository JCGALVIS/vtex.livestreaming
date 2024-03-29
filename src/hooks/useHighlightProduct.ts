import { useEffect, useState } from 'react'
import type { HighlightProduct, Product } from './../typings/livestreaming'
import { useLivestreamingContext } from '../context'
import { useShowHightlightsForFinishedEvents } from './useShowHightlightsForFinishedEvents'
import { useFetchProducts } from './useFetchProducts'

type useHighlightProductProps = {
  highlightProduct: HighlightProduct | undefined
  collectionId: string | undefined
  isFinalized: boolean
  setCollection?: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const useHighlightProduct = ({
  highlightProduct,
  collectionId,
  isFinalized,
  setCollection
}: useHighlightProductProps) => {
  const [product, setProduct] = useState<Product>()
  const [showProduct, setShowProduct] = useState<boolean | undefined>(false)
  const { idLivestreaming } = useLivestreamingContext()
  const { products } = useFetchProducts({
    collectionId,
    setCollection
  })

  const handleSetProduct = (productId: string, products: Product[]) => {
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
        pdpLink: product?.pdpLink,
        skuId: product?.skuId,
        items: product?.items
      })
    }
  }

  useShowHightlightsForFinishedEvents(
    handleSetProduct,
    setShowProduct,
    isFinalized
  )

  useEffect(() => {
    localStorage.removeItem('collectionId')
    if (highlightProduct?.backgroundWhiteHighlight) return

    if (highlightProduct && !highlightProduct?.showProduct)
      localStorage.removeItem('product')

    const dataProduct = {
      productId: highlightProduct?.productId,
      showProduct: highlightProduct?.showProduct,
      collection: highlightProduct?.collection,
      livestreamingId: highlightProduct?.livestreamingId
    }

    if (highlightProduct)
      localStorage.setItem('product', JSON.stringify(dataProduct))

    const storageProduct = localStorage.getItem('product')
    const storageCollectionId = localStorage.getItem('collectionId')

    if (
      collectionId &&
      (!storageCollectionId || collectionId !== storageCollectionId)
    ) {
      localStorage.setItem('collectionId', collectionId)
      products && localStorage.setItem('products', JSON.stringify(products))
    }

    let objetProduct = storageProduct && JSON.parse(storageProduct)
    if (`${objetProduct?.livestreamingId}` !== idLivestreaming) {
      objetProduct = null
    }

    const isShowProduct = objetProduct
      ? objetProduct.showProduct
      : highlightProduct?.showProduct

    if (products && isShowProduct) {
      const productId = objetProduct.productId || highlightProduct?.productId
      handleSetProduct(productId, products)

      if (productId) setShowProduct(isShowProduct)
    } else {
      setShowProduct(isShowProduct)
    }
  }, [collectionId, highlightProduct, products])

  return { product, showProduct }
}
