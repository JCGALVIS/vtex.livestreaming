import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const windowInfo: any = window
const { vtexjs } = windowInfo

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

  const addToCart = (product: any) => {
    var item = {
      id: product.skuId,
      quantity: 1,
      seller: '1'
    }

    return vtexjs.checkout.addToCart([item])
  }

  return (
    <Livestreaming
      addToCart={addToCart}
      account='livestreamingdemo'
      environment='dev'
      getProductId={getProductByIdCace}
      getProducts={getProductsCace}
      idLivestreaming='9dfcaef5-f6eb-47c2-ab6a-e69c4c11b555'
      isInGlobalPage={true}
      isInfinite={true}
      kuikpay='_KUIKPAY'
      originOfProducts='globalPage'
      redirectTo='_PDP'
      showChat={true}
      showLike={true}
      showQuickView={false}
      showProductsCarousel={true}
      showSidebarProducts={true}
      showViewers={true}
      time={1000000000}
    />
  )
}

export default App
