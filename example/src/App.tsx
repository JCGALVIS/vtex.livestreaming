import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  const getProductsCace = async (collectionId: number) => {
    const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://www.livestreaming.link/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

    const response = await fetch(url)
    const data = await response.json()

    if (data && data.length > 0) {
      const products = data.map((product: any) => {
        return {
          id: product.productId,
          name: product?.productName,
          priceWithDiscount:
            product?.items[0]?.sellers[0]?.commertialOffer.Price,
          price: product?.items[0]?.sellers[0]?.commertialOffer.ListPrice,
          imageUrl: product?.items[0]?.images[0]?.imageUrl,
          addToCartLink: product?.items[0].complementName
            ? product?.items[0].complementName
            : product?.items[0].sellers[0].addToCartLink,
          isAvailable: product?.skuSpecifications
            ? true
            : product?.items[0]?.sellers[0]?.commertialOffer.IsAvailable,
          variationSelector: product?.skuSpecifications || [],
          pdpLink: product.link,
          skuId: product.items[0].itemId
        }
      })
      return products
    }

    return null
  }

  const getProductByIdCace = async (productId: string) => {
    const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

    const response = await fetch(url)
    const data = await response.json()

    if (data && data.length > 0) {
      const product = {
        id: data[0]?.productId,
        name: data[0]?.productName,
        priceWithDiscount: data[0]?.items[0]?.sellers[0]?.commertialOffer.Price,
        price: data[0]?.items[0]?.sellers[0]?.commertialOffer.ListPrice,
        imageUrl: data[0]?.items[0]?.images[0]?.imageUrl,
        addToCartLink: data[0]?.items[0].complementName
          ? data[0]?.items[0].complementName
          : data[0]?.items[0].sellers[0].addToCartLink,
        items: data[0]?.items,
        isAvailable: data[0]?.skuSpecifications
          ? true
          : data[0]?.items[0]?.sellers[0]?.commertialOffer.IsAvailable,
        variationSelector: data[0]?.skuSpecifications,
        pdpLink: data[0]?.link
      }

      return product
    }

    return null
  }

  return (
    <Livestreaming
      account='livestreamingdemo'
      getProductId={getProductByIdCace}
      getProducts={getProductsCace}
      idLivestreaming='a65d8a0e-1643-4ed2-b217-7c751f1d0906'
      isInGlobalPage='_ISINGLOBALPAGE'
      isInfinite='_ISINFINITE'
      kuikpay='_KUIKPAY'
      originOfProducts='_ORIGINOFPRODUCTS'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showQuickView={true}
      showProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      showSidebarProducts={true}
      showViewers={true}
      time='_TIME'
    />
  )
}

export default App
