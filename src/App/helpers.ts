const CORS_PROXY = 'https://3hvqfl2xcg.execute-api.us-east-1.amazonaws.com';

export const getProductsCace = async (
  collectionId?: string,
  account?: string,
) => {
  const url = `${CORS_PROXY}?url=https://www.livestreaming.link/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`;

  const response = await fetch(url);
  const data = await response.json();

  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      const item = product?.items[0];
      const seller = item?.sellers.find(
        (seller: { sellerDefault: boolean }) => seller.sellerDefault === true,
      );

      return {
        id: product.productId,
        name: product?.productName,
        priceWithDiscount: seller?.commertialOffer.Price,
        price: seller?.commertialOffer.ListPrice,
        imageUrl: item?.images[0]?.imageUrl,
        addToCartLink: item?.complementName
          ? item?.complementName
          : seller?.addToCartLink,
        isAvailable: product?.skuSpecifications
          ? true
          : seller?.commertialOffer.IsAvailable,
        variationSelector: product?.skuSpecifications || [],
        pdpLink: product.link,
        skuId: item?.itemId,
      };
    });
    return products;
  }

  return null;
};

export const getProductByIdCace = async (productId?: string) => {
  const url = `${CORS_PROXY}?url=https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data && data.length > 0) {
    const item = data[0]?.items[0];
    const seller = item?.sellers.find(
      (seller: { sellerDefault: boolean }) => seller.sellerDefault === true,
    );

    const product = {
      id: data[0]?.productId,
      name: data[0]?.productName,
      priceWithDiscount: seller?.commertialOffer.Price,
      price: seller?.commertialOffer.ListPrice,
      imageUrl: item?.images[0]?.imageUrl,
      addToCartLink: item?.complementName
        ? item?.complementName
        : seller?.addToCartLink,
      items: data[0]?.items,
      isAvailable: data[0]?.skuSpecifications
        ? true
        : seller?.commertialOffer.IsAvailable,
      variationSelector: data[0]?.skuSpecifications,
      pdpLink: data[0]?.link,
    };

    return product;
  }

  return null;
};

export const addToCart = (product?: any) => {
  var item = {
    id: product.skuId,
    quantity: 1,
    seller: '1',
  };

  return window.vtexjs.checkout.addToCart([item]);
};
