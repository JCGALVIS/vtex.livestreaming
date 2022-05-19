import type { Product } from '../typings/livestreaming'

type AddToCartArgs = {
  product: Product
  addToCartCallback: (product: Product) => void
  openProductDetail?: boolean
}

type Message = {
  type: 'error' | 'success'
  value: string
}

export const addToCartHandler = (args: AddToCartArgs) => {
  const { addToCartCallback, product, openProductDetail = false } = args
  const { addToCartLink } = product
  let message: Message | null = null

  if (openProductDetail) {
    window.open(addToCartLink, '_blank')
  } else {
    try {
      addToCartCallback && addToCartCallback(product)
      message = {
        type: 'success',
        value: 'store/text.add-to-cart'
      }
    } catch (err) {
      console.error('Error executing addToCartCallback \n', err)
      message = {
        type: 'error',
        value: 'store/text.add-to-cart-error'
      }
    }
  }

  return message
}
