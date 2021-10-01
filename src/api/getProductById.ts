import { apiCall } from './apiCall'
type GetProductByIdProps = {
  productId?: string | undefined
}

export const getProductById = async ({ productId }: GetProductByIdProps) => {
  const url = `/api/catalog_system/pub/products/search?fq=productId::${productId}`

  const data = await apiCall({ url })

  console.log(data)
}
