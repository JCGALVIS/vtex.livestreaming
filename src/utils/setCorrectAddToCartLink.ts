export const setCorrectAddToCartLink = (
  data?: any,
  account?: string,
  host?: string
) => {
  try {
    for (let element of data) {
      if (element.items) {
        let items = element.items
        items.map((item: any) => {
          if (item.sellers[0].addToCartLink) {
            const seller = item.sellers[0]
            seller.addToCartLink = item.sellers[0].addToCartLink.replace(
              `${account}.myvtex.com`,
              host ? host : ''
            )
          }
          return item
        })
      }
    }
  } catch (error) {
    if (data[0]?.items[0].sellers[0].addToCartLink) {
      const seller = data[0]?.items[0].sellers[0]
      seller.addToCartLink = data[0]?.items[0].sellers[0].addToCartLink.replace(
        `${account}.myvtex.com`,
        host ? host : ''
      )
    }
  }
}
