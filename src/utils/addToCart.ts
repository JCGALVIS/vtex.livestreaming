// eslint-disable-next-line no-unused-vars
export const addToCart = (idProduct: string, pdp: boolean) => {
  const event = new CustomEvent('addToCartPortal')

  if (!pdp) {
    document.dispatchEvent(event)
  } else {
    const link = document.getElementById(`add-cart-${idProduct}`)
    if (link) link.click()
  }
}
