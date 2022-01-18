export const addToCart = (
  idProduct: string,
  redirectTo: boolean,
  isInGlobalPage: boolean,
  showQuickView: boolean,
  id: string
) => {
  console.log('jcg 3')
  let message = ''
  if (redirectTo || isInGlobalPage || !showQuickView) {
    const link = document.getElementById(`add-cart-${id}`)
    if (link) link.click()
    message = ''
  } else {
    var item = {
      id: idProduct,
      quantity: 1,
      seller: '1'
    }

    window.vtexjs.checkout.addToCart([item], null, 1).done(() => {
      message = 'store/text.add-to-cart'
    })

    message = 'store/text.add-to-cart'
  }

  return message
}
