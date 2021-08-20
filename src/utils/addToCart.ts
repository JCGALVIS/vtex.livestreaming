// eslint-disable-next-line no-unused-vars
export const addToCart = (idProduct: string) => {
  const link = document.getElementById(`add-cart-${idProduct}`)
  console.log(link)

  if (link) link.click()
}
