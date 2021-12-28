export const addToCart = (
  idProduct: string,
  redirectTo: boolean,
  isInGlobalPage: boolean,
  showQuickView: boolean
) => {
  let message = ''
  if (redirectTo || isInGlobalPage || !showQuickView) {
    const link = document.getElementById(`add-cart-${idProduct}`)
    if (link) link.click()
    message = ''
  } else {
    var item = {
      id: idProduct,
      quantity: 1,
      seller: '1'
    }

    window.vtexjs.checkout.addToCart([item], null, 1).done(() => {
      message = 'PRODUCTO AGREGADO AL CARRITO!'
    })
  }

  return message
}
