import { useEffect, useState } from 'react'
import type { HighlightProduct, Products } from './../typings/livestreaming'
import { useLivestreamingContext } from '../context'
import { useShowHightlightsForFinishedEvents } from './useShowHightlightsForFinishedEvents'
import { useFetchProducts } from './useFetchProducts'

type useHighlightProductProps = {
  highlightProduct: HighlightProduct | undefined
  collectionId: string | undefined
  isFinalized: boolean
}

export const useHighlightProduct = ({
  highlightProduct,
  collectionId,
  isFinalized
}: useHighlightProductProps) => {
  const [product, setProduct] = useState<Products>()
  const [showProduct, setShowProduct] = useState<boolean | undefined>(false)
  const { idLivestreaming } = useLivestreamingContext()
  const { products, loading } = useFetchProducts({
    collectionId
  })

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
      !loading && localStorage.setItem('products', JSON.stringify(products))
    }

    let objetProduct = storageProduct && JSON.parse(storageProduct)
    if (`${objetProduct?.idLivestreaming}` !== idLivestreaming) {
      objetProduct = null
    }

    const isShowProduct = objetProduct
      ? objetProduct.showProduct
      : highlightProduct?.showProduct

    if (storageProducts && isShowProduct) {
      const productId = objetProduct.productId || highlightProduct?.productId
      handleSetProduct(productId, storageProducts)

      if (productId) setShowProduct(isShowProduct)
    } else {
      setShowProduct(isShowProduct)
    }
  }, [collectionId, highlightProduct])

  return { product, showProduct }
}
