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
      console.log('products: ', products)
      return products
    }

    return null
  }

  return (
    <Livestreaming
      account='__ACCOUNT'
      getProducts={getProductsCace}
      idLivestreaming='__IDLIVESTREAMING'
      isInGlobalPage='_ISINGLOBALPAGE'
      isInfinite='_ISINFINITE'
      kuikpay='_KUIKPAY'
      originOfProducts='_ORIGINOFPRODUCTS'
      redirectTo='_PDP'
      showChat='_INACTIVATECHAT'
      showLike='_INACTIVATELIKE'
      showQuickView='_SHOWQUICKVIEW'
      showProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      showSidebarProducts='_INACTIVESIDEBARPRODUCTS'
      showViewers='_INACTIVATEVIEWERS'
      time='_TIME'
    />
  )
}

export default App
