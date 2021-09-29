import { config } from './../config'
import { apiCall } from './../api/apiCall'

type getProductsProps = {
  collectionId?: string | undefined
  originOfProducts?: string
  account?: string
}

export const getProducts = async ({
  collectionId,
  originOfProducts
}: getProductsProps) => {
  let products

  if (originOfProducts === 'platform') {
    products = getProductsPlatform()
  } else {
    products = getProductsVtex({ collectionId })
  }

  return products
}

const getProductsVtex = async ({ collectionId }: getProductsProps) => {
  const url = `/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

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

const getProductsPlatform = async () => {
  const url = config.API_PLATFORM + '/products'

  const { data } = await apiCall({ url })

  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      return {
        id: product.id,
        name: product.title,
        priceWithDiscount: product.salesPrice,
        price: product.price,
        imageUrl: product.pictures[0],
        addToCartLink: product.link,
        isAvailable: product.status === 'active'
      }
    })
    return products
  }
  return null
}