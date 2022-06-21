export const filterAvailableProducts = (product: any) => {
  const availableItems = product?.items.filter((item: any) => {
    const availableSellers = item.sellers.filter(
      (seller: any) => seller.commertialOffer.IsAvailable
    )
    return availableSellers.length > 0
  })

  let item = availableItems[0]

  if (!item) {
    item = product?.items[0]
  }

  const seller = item?.sellers.find(
    (seller: { sellerDefault: boolean }) => seller.sellerDefault === true
  )

  return {
    item,
    seller,
    isAvailable: !!availableItems?.length
  }
}
