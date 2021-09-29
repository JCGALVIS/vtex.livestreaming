import { apiCall } from './apiCall'
type GetProductByIdProps = {
  productId?: string | undefined
  account: string
}

export const getProductById = async ({
  productId,
  account
}: GetProductByIdProps) => {
  const url = `https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productId::${productId}`

  const data = await apiCall({ url })

  console.log(data)
}
