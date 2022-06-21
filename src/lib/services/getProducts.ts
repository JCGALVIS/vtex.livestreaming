import { mapDomainToPdp, setCorrectAddToCartLink } from '../utils'
import { apiCall } from './apiCall'
import { config } from '../enviroment/config'
import { filterAvailableProducts } from '../utils/products'

const CORS_PROXY_URL = 'https://3hvqfl2xcg.execute-api.us-east-1.amazonaws.com'

type GetProductsProps = {
  collectionId?: string | undefined;
  originOfProducts?: string;
  productId?: string | undefined;
  account?: string | undefined;
  host?: string;
  environment?: string;
};

export const optionsToGetProducts = async ({
  collectionId,
  originOfProducts,
  account,
  host,
  environment,
}: GetProductsProps) => {
  let products: Promise<any>;

  if (originOfProducts === 'CACE') {
    products = getProductsCace({ collectionId });
  } else {
    products = getProductsGlobalPage({
      collectionId,
      account,
      environment,
      host,
    });
  }

  return mapDomainToPdp(products, account, host);
};

export const optionsToGetProductById = async ({
  productId,
  originOfProducts,
  account,
  host,
  environment,
}: GetProductsProps) => {
  let product;

  if (originOfProducts === 'CACE') {
    product = getProductByIdCace({ productId, account, host });
  } else {
    product = getProductByIdGlobalPage({
      productId,
      account,
      host,
      environment,
    });
  }

  return product;
};

const getProductsCace = async ({ collectionId }: GetProductsProps) => {
  const url = `${CORS_PROXY_URL}?url=https://www.livestreaming.link/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

  const data = await apiCall({ url });
  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      const result: any = filterAvailableProducts(product)
      const { item, seller, isAvailable } = result

      return {
        id: product.productId,
        name: product?.productName,
        priceWithDiscount: seller?.commertialOffer.Price,
        price: seller?.commertialOffer.ListPrice,
        imageUrl: item?.images[0]?.imageUrl,
        addToCartLink: item?.complementName
          ? item?.complementName
          : seller?.addToCartLink,
        isAvailable,
        variationSelector: product?.skuSpecifications || [],
        pdpLink: product.link,
        skuId: item?.itemId,
      };
    });
    return products;
  }

  return null;
};

const getProductsGlobalPage = async ({
  collectionId,
  account,
  environment,
  host,
}: GetProductsProps) => {
  let url = '';
  let data = [];

  const { API_PLATFORM } = config(environment || '');

  url = `${API_PLATFORM}/products?account=${btoa(account as string)}`;

  const dataPlataform = host ? undefined : await apiCall({ url });

  data = dataPlataform && dataPlataform.data;

  if (data && data.length > 0) {
    const products = data.map((product: any) => {
      return {
        id: product.id,
        name: product.title,
        priceWithDiscount: product.salesPrice,
        price: product.price,
        imageUrl: product.pictures[0],
        addToCartLink: product.link,
        isAvailable: product.status === 'active',
        variationSelector: [],
        pdpLink: product.link,
        skuId: product.id,
      };
    });
    return products;
  }

  url = `${CORS_PROXY_URL}?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productClusterIds:${collectionId}&_from=0&_to=49`

  data = await apiCall({ url });

  if (data && data.length > 0) {
    setCorrectAddToCartLink(data, account, host);

    const products = data.map((product: any) => {
      const result: any = filterAvailableProducts(product)
      const { item, seller, isAvailable } = result

      return {
        id: product.productId,
        name: product?.productName,
        priceWithDiscount: seller?.commertialOffer.Price,
        price: seller?.commertialOffer.ListPrice,
        imageUrl: item?.images[0]?.imageUrl,
        addToCartLink: seller?.addToCartLink,
        isAvailable,
        variationSelector: product?.skuSpecifications || [],
        pdpLink: product.link,
        skuId: item?.itemId,
      };
    });

    return products;
  }

  return null;
};

const getProductByIdCace = async ({ productId }: GetProductsProps) => {
  const url = `${CORS_PROXY_URL}?url=https://livestreamingdemo.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  const data = await apiCall({ url });

  if (data && data.length > 0) {
    const result: any = filterAvailableProducts(data[0])
    const { item, seller, isAvailable } = result

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
      isAvailable,
      variationSelector: data[0]?.skuSpecifications,
      pdpLink: data[0]?.link,
    };

    return product;
  }

  return null;
};

const getProductByIdGlobalPage = async ({
  productId,
  account,
  host,
  environment,
}: GetProductsProps) => {
  let url = '';
  let data;

  const { API_PLATFORM } = config(environment || '');

  url = `${API_PLATFORM}/products/${productId}?account=${btoa(
    account as string,
  )}`;

  const dataPlataform = host ? undefined : await apiCall({ url });

  data = dataPlataform && dataPlataform.data;

  if (data) {
    const product = {
      id: data.id,
      name: data.title,
      priceWithDiscount: data.salesPrice,
      price: data.price,
      imageUrl: data.pictures[0],
      addToCartLink: data.link,
      isAvailable: data.status === 'active',
      variationSelector: [],
      pdpLink: data.link,
      skuId: data.id,
    };
    return product;
  }

  url = `${CORS_PROXY_URL}?url=https://${account}.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`

  data = await apiCall({ url });

  if (data && data.length > 0) {
    setCorrectAddToCartLink(data, account, host);

    const result: any = filterAvailableProducts(data[0])
    const { item, seller, isAvailable } = result

    const product = {
      id: data[0]?.productId,
      name: data[0]?.productName,
      priceWithDiscount: seller?.commertialOffer.Price,
      price: seller?.commertialOffer.ListPrice,
      imageUrl: item?.images[0]?.imageUrl,
      addToCartLink: seller?.addToCartLink,
      items: data[0]?.items,
      isAvailable,
      variationSelector: data[0]?.skuSpecifications,
      pdpLink: data[0]?.link,
    };

    return product;
  }

  return null;
};
