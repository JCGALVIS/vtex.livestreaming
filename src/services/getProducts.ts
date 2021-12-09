import { apiCall } from './apiCall'
import { config } from './../config'

type GetProductsProps = {
  collectionId?: string | undefined
  originOfProducts?: string
  productId?: string | undefined
  account?: string | undefined
}

export const getProducts = async ({
  collectionId,
  originOfProducts,
  account
}: GetProductsProps) => {
  let products

  if (originOfProducts === 'platform') {
    products = getProductsPlatform()
  } else if (originOfProducts === 'CACE') {
    // Eliminar terminado el evento CACE
    products = getProductsCace({ collectionId })
  } else if (originOfProducts === 'globalPage') {
    products = getProductsGlobalPage({ collectionId, account })
  } else {
    products = getProductsVtex({ collectionId })
  }

  return products
}

const getProductsCace = async ({ collectionId }: GetProductsProps) => {
  const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://www.livestreaming.link/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

  const data = await apiCall({ url })
  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      return {
        id: product.productId,
        name: product?.productName,
        priceWithDiscount: product?.items[0]?.sellers[0]?.commertialOffer.Price,
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

const getProductsVtex = async ({ collectionId }: GetProductsProps) => {
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
        addToCartLink: product?.items[0].sellers[0].addToCartLink,
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
        isAvailable: product.status === 'active',
        variationSelector: [],
        pdpLink: product.link,
        skuId: product.items[0].itemId
      }
    })
    return products
  }
  return null
}

const getProductsGlobalPage = async ({
  collectionId,
  account
}: GetProductsProps) => {
  const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

  const data = await apiCall({ url })
  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      return {
        id: product.productId,
        name: product?.productName,
        priceWithDiscount: product?.items[0]?.sellers[0]?.commertialOffer.Price,
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

export const getProductById = async ({
  productId,
  originOfProducts,
  account
}: GetProductsProps) => {
  let product

  if (originOfProducts === 'CACE') {
    // Eliminar terminado el evento CACE
    product = getProductByIdCace({ productId })
  } else if (originOfProducts === 'globalPage') {
    product = getProductByIdGlobalPage({ productId, account })
  } else {
    product = getProductByIdVtex({ productId })
  }

  return product
}

const getProductByIdCace = async ({ productId }: GetProductsProps) => {
  const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url })

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

const getProductByIdVtex = async ({ productId }: GetProductsProps) => {
  const url = `/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url })

  if (data && data.length > 0) {
    const product = {
      id: data[0]?.productId,
      name: data[0]?.productName,
      priceWithDiscount: data[0]?.items[0]?.sellers[0]?.commertialOffer.Price,
      price: data[0]?.items[0]?.sellers[0]?.commertialOffer.ListPrice,
      imageUrl: data[0]?.items[0]?.images[0]?.imageUrl,
      addToCartLink: data[0]?.items[0].sellers[0].addToCartLink,
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

const getProductByIdGlobalPage = async ({
  productId,
  account
}: GetProductsProps) => {
  const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url })

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
