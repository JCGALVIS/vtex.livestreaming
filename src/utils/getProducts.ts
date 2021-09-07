import { apiCall } from './../api/apiCall'

type getProductsProps = {
  collectionId?: string | undefined
}

export const getProducts = async ({ collectionId }: getProductsProps) => {
  const url = `/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}`

  const data = await apiCall({ url })
  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      return {
        id: product.productId,
        name: product?.productName,
        priceWithDiscount: product?.items[0]?.sellers[0]?.commertialOffer.Price,
        price: product?.items[0]?.sellers[0]?.commertialOffer.ListPrice,
        imageUrl: product?.items[0]?.images[0]?.imageUrl,
        addToCartLink: product?.link,
        isAvailable: product?.items[0]?.sellers[0]?.commertialOffer.IsAvailable
      }
    })
    return products
  }

  return null
}
