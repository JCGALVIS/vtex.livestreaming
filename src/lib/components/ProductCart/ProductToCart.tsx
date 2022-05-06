import React, { useMemo, Fragment, useContext } from 'react';

import { SettingContext } from '../../context';
import { ProductCart } from './ProductCart';

export const ProductToCart = () => {
  const { infoSocket } = useContext(SettingContext);

  const { productsInCart } = infoSocket || {};

  const ProductCollection = useMemo(
    () =>
      productsInCart &&
      productsInCart.map((product, index) => (
        <ProductCart key={index} image={product.imageUrl} />
      )),
    [productsInCart],
  );

  return <Fragment>{ProductCollection}</Fragment>;
};
