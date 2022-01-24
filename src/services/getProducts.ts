import { apiCall } from './apiCall'
import { config } from './../config'
import { base64Encode } from './../utils'

type GetProductsProps = {
  collectionId?: string | undefined
  originOfProducts?: string
  productId?: string | undefined
  account?: string | undefined
  host?: string
}

export const getProducts = async ({
  collectionId,
  originOfProducts,
  account,
  host
}: GetProductsProps) => {
  let products: Promise<any>

  if (originOfProducts === 'platform') {
    products = getProductsPlatform(account)
  } else if (originOfProducts === 'CACE') {
    // Eliminar terminado el evento CACE
    products = getProductsCace({ collectionId })
  } else if (originOfProducts === 'globalPage') {
    if (account === 'plataforma') {
      products = getProductsPlatform(account)
    } else {
      products = getProductsGlobalPage({ collectionId, account })
    }
  } else {
    products = getProductsVtex({ collectionId })
  }
  return mapDomainToPdp(products, account, host)
}

const mapDomainToPdp = (
  products: Promise<any>,
  account?: string,
  host?: string
) => {
  const productoWithHost = new Promise((resolve, reject) => {
    products
      .then((pros: any[]) => {
        const prosMap = pros?.map((pro: any) => {
          let pdpLink = pro.pdpLink ? pro.pdpLink : ''
          if (host) {
            pdpLink = pdpLink.replace(`${account}.myvtex.com`, host ? host : '')
          }
          return {
            ...pro,
            pdpLink
          }
        })
        resolve(prosMap)
      })
      .catch((err) => reject(err))
  })
  return productoWithHost
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

const getProductsPlatform = async (account: string | undefined) => {
  const url = config.API_PLATFORM + `/products?account=${base64Encode(account)}`

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
        skuId: product.id
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

export const getProductById = async ({
  productId,
  originOfProducts,
  account,
  host
}: GetProductsProps) => {
  let product

  if (originOfProducts === 'platform') {
    product = getProductByIdPlatform({ productId })
  } else if (originOfProducts === 'CACE') {
    // Eliminar terminado el evento CACE
    product = getProductByIdCace({ productId, account, host })
  } else if (originOfProducts === 'globalPage') {
    if (account === 'plataforma') {
      product = getProductByIdPlatform({ productId })
    } else {
      product = getProductByIdGlobalPage({ productId, account, host })
    }
  } else {
    product = getProductByIdVtex({ productId, account, host })
  }

  return product
}

const setCorrectAddToCartLink = (
  data?: any,
  account?: string,
  host?: string
) => {
  if (data[0]?.items[0].sellers[0].addToCartLink) {
    const seller = data[0]?.items[0].sellers[0]
    seller.addToCartLink = data[0]?.items[0].sellers[0].addToCartLink.replace(
      `${account}.myvtex.com`,
      host ? host : ''
    )
  }
}

const getProductByIdCace = async ({
  productId,
  account,
  host
}: GetProductsProps) => {
  const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url })

  if (data && data.length > 0) {
    setCorrectAddToCartLink(data, account, host)

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

const getProductByIdVtex = async ({
  productId,
  account,
  host
}: GetProductsProps) => {
  const url = `/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url })

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

const getProductByIdPlatform = async ({ productId }: GetProductsProps) => {
  const url = `${config.API_PLATFORM}/products/${productId}`

  const { data } = await apiCall({ url })

  if (data && data.length > 0) {
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

  return null
}

const getProductByIdGlobalPage = async ({
  productId,
  account,
  host
}: GetProductsProps) => {
  const url = `https://vtsfr28120.execute-api.us-east-1.amazonaws.com/dev?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url })

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
