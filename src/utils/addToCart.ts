// eslint-disable-next-line no-unused-vars
export const addToCart = (idProduct: string, pdp: boolean) => {
  const event = new CustomEvent('addToCartPortal')
  document.dispatchEvent(event)

  if (pdp) {
    const link = document.getElementById(`add-cart-${idProduct}`)
    if (link) link.click()
  }

}
