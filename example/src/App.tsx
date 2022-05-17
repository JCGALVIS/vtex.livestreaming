import React from 'react'
import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const windowInfo: any = window
const { vtexjs } = windowInfo

const CORS_PROXY_URL = 'https://3hvqfl2xcg.execute-api.us-east-1.amazonaws.com'

const App = () => {
  const getProductsCace = async (collectionId: number) => {
    const url = `${CORS_PROXY_URL}?url=https://www.livestreaming.link/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

    const response = await fetch(url)
    const data = await response.json()

    if (data && data.length > 0) {
      const products = data.map((product: any) => {
        const item = product?.items[0]
        const seller = item?.sellers.find(
          (seller: { sellerDefault: boolean }) => seller.sellerDefault === true
        )

        return {
          id: product.productId,
          name: product?.productName,
          priceWithDiscount: seller?.commertialOffer.Price,
          price: seller?.commertialOffer.ListPrice,
          imageUrl: item?.images[0]?.imageUrl,
          addToCartLink: item?.complementName
            ? item?.complementName
            : seller?.addToCartLink,
          isAvailable: product?.skuSpecifications
            ? true
            : seller?.commertialOffer.IsAvailable,
          variationSelector: product?.skuSpecifications || [],
          pdpLink: product.link,
          skuId: item?.itemId
        }
      })
      return products
    }

    return null
  }

  const getProductByIdCace = async (productId: string) => {
    const url = `${CORS_PROXY_URL}?url=https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

    const response = await fetch(url)
    const data = await response.json()

    if (data && data.length > 0) {
      const item = data[0]?.items[0]
      const seller = item?.sellers.find(
        (seller: { sellerDefault: boolean }) => seller.sellerDefault === true
      )

      const product = {
        id: data[0]?.productId,
        name: data[0]?.productName,
        priceWithDiscount: seller?.commertialOffer.Price,
        price: seller?.commertialOffer.ListPrice,
        imageUrl: item?.images[0]?.imageUrl,
        addToCartLink: item?.complementName
          ? item?.complementName
          : seller?.addToCartLink,
        items: data[0]?.items,
        isAvailable: data[0]?.skuSpecifications
          ? true
          : seller?.commertialOffer.IsAvailable,
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
      idLivestreaming='06012abd-85eb-4acb-9f03-ec3f1bfd8dca'
      isInGlobalPage={true}
      isInfinite={true}
      kuikpay={false}
      originOfProducts='_ORIGINOFPRODUCTS'
      redirectTo={false}
      showChat={true}
      showLike={true}
      showQuickView={false}
      showProductsCarousel={false}
      showSidebarProducts={true}
      showViewers={true}
      time={9999999999999}
    />
  )
}

export default App
