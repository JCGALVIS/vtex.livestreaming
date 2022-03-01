import { mapDomainToPdp, setCorrectAddToCartLink } from '../utils'
import { apiCall } from './apiCall'
import { config } from '../enviroment/config'

type GetProductsProps = {
  collectionId?: string | undefined
  originOfProducts?: string
  productId?: string | undefined
  account?: string | undefined
  host?: string
  environment?: string
}

export const optionsToGetProducts = async ({
  collectionId,
  originOfProducts,
  account,
  host,
  environment
}: GetProductsProps) => {
  let products: Promise<any>

  if (originOfProducts === 'CACE') {
    products = getProductsCace({ collectionId })
  } else {
    products = getProductsGlobalPage({
      collectionId,
      account,
      environment,
      host
    })
  }

  return mapDomainToPdp(products, account, host)
}

export const optionsToGetProductById = async ({
  productId,
  originOfProducts,
  account,
  host,
  environment
}: GetProductsProps) => {
  let product

  if (originOfProducts === 'CACE') {
    product = getProductByIdCace({ productId, account, host })
  } else {
    product = getProductByIdGlobalPage({
      productId,
      account,
      host,
      environment
    })
  }

  return product
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

const getProductsGlobalPage = async ({
  collectionId,
  account,
  environment,
  host
}: GetProductsProps) => {
  let url = ''
  let data = []

  const { API_PLATFORM } = config(environment || '')

  url = `${API_PLATFORM}/products?account=${btoa(account as string)}`

  const dataPlataform = host ? undefined : await apiCall({ url })

  data = dataPlataform && dataPlataform.data

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
        skuId: product.id
      }
    })
    return products
  }

  url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

  data = await apiCall({ url })

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

const getProductByIdGlobalPage = async ({
  productId,
  account,
  host,
  environment
}: GetProductsProps) => {
  let url = ''
  let data

  const { API_PLATFORM } = config(environment || '')

  url = `${API_PLATFORM}/products/${productId}?account=${btoa(
    account as string
  )}`

  const dataPlataform = host ? undefined : await apiCall({ url })

  data = dataPlataform && dataPlataform.data

  if (data) {
    const product = {
      id: data.id,
      name: data.title,
      priceWithDiscount: data.salesPrice,
      price: data.price,
      imageUrl: data.pictures[0],
      addToCartLink: data.link,
      isAvailable: data.status === 'active',
      variationSelector: [],
      pdpLink: data.link,
      skuId: data.id
    }
    return product
  }

  url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  data = await apiCall({ url })

  if (data && data.length > 0) {
    setCorrectAddToCartLink(data, account, host)

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
