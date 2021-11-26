export const addToCart = (
  idProduct: string,
  redirectTo: boolean,
  isInGlobalPage: boolean
) => {
  if (redirectTo || isInGlobalPage) {
    const link = document.getElementById(`add-cart-${idProduct}`)
    if (link) link.click()
  } else {
    var item = {
      id: idProduct,
      quantity: 1,
      seller: '1'
    }

    window.vtexjs.checkout.addToCart([item], null, 1).done(() => {
      alert('PRODUCTO AGREGADO AL CARRITO!')
    })
  }
}
