import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
// eslint-disable-next-line no-unused-vars
import { HighlightProduct } from './../typings/livestreaming'

type useHighlightProductProps = {
  highlightProduct: HighlightProduct | undefined
  collectionId: string | undefined
}

export const useHighlightProduct = ({
  highlightProduct,
  collectionId
}: useHighlightProductProps) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: 0,
    priceWithDiscount: 0,
    imageUrl: '',
    addToCartLink: '',
    isAvailable: true
  })
  const [showProduct, setShowProduct] = useState<boolean | undefined>(false)

  const handlerCloseCard = () => {
    setShowProduct(false)
    setProduct({
      id: '',
      name: '',
      price: 0,
      priceWithDiscount: 0,
      imageUrl: '',
      addToCartLink: '',
      isAvailable: true
    })
    localStorage.removeItem('product')
  }

  useEffect(() => {
    if (highlightProduct?.backgroundWhiteHighlight) return
    const url = `/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}`

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
      const getProducts = async () => {
        const data = await apiCall({ url })
        if (data && data.length > 0) {
          localStorage.setItem('products', JSON.stringify(data))
        }
      }

      getProducts()
    }

    const objetProduct = storageProduct && JSON.parse(storageProduct)
    const isShowProduct = objetProduct
      ? objetProduct.showProduct
      : highlightProduct?.showProduct

    if (storageProducts && isShowProduct) {
      const products = JSON.parse(storageProducts)

      const productId = objetProduct.productId || highlightProduct?.productId

      const product = products.find(
        (product: { productId: string | undefined }) =>
          product.productId === productId
      )

      setProduct({
        id: product?.productId,
        name: product?.productName,
        priceWithDiscount: product?.items[0]?.sellers[0]?.commertialOffer.Price,
        price: product?.items[0]?.sellers[0]?.commertialOffer.ListPrice,
        imageUrl: product?.items[0]?.images[0]?.imageUrl,
        addToCartLink: product?.link,
        isAvailable: product?.items[0]?.sellers[0]?.commertialOffer.IsAvailable
      })
    }

    setShowProduct(isShowProduct)
  }, [collectionId, highlightProduct])

  return { product, showProduct, handlerCloseCard }
}
