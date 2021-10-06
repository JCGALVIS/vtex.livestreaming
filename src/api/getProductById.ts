import { apiCall } from './apiCall'
type GetProductByIdProps = {
  productId?: string | undefined
}

export const getProductById = async ({ productId }: GetProductByIdProps) => {
  const url = `https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

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
      isAvailable:
        data[0]?.skuSpecifications >= 0
          ? true
          : data[0]?.items[0]?.sellers[0]?.commertialOffer.IsAvailable,
      variationSelector: data[0]?.skuSpecifications
    }

    return product
  }

  return null
}
