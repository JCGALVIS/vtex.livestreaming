export const addToCart = (idProduct: string, pdp: boolean) => {
  if (pdp) {
    const link = document.getElementById(`add-cart-${idProduct}`)
    if (link) link.click()
  } else {
    var item = {
      id: idProduct,
      quantity: 1,
      seller: '1'
    }

    window.vtexjs.addToCart([item], null, 1).done(() => {
      alert('PRODUCTO AGREGADO AL CARRITO!')
    })
  }
}
