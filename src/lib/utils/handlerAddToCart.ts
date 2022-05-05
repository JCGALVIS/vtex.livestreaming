/* eslint-disable no-unused-vars */
import type { Products } from '../../typings/livestreaming';

export const handlerAddToCart = (
  addToCart: (product: Products) => void,
  product: Products,
  redirectTo: boolean,
  isInGlobalPage: boolean,
  showQuickView: boolean,
) => {
  let message = '';
  const { id, skuId } = product;
  if (redirectTo || isInGlobalPage || !showQuickView) {
    const link = document.getElementById(`add-cart-${skuId || id}`);
    if (link) link.click();
    message = '';
  } else {
    addToCart && addToCart(product);

    message = 'store/text.add-to-cart';
  }

  return message;
};
