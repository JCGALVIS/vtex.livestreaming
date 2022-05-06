/* eslint-disable no-unused-vars */
import IconClose from '@vtex/styleguide/lib/icon/Close';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';
import { KuikPayButton } from '..';
import type { Values } from '../../../typings/livestreaming';
import { ActionsContext } from '../../context/ActionsContext';
import { useFetchProductById } from '../../hooks/useFetchProductById';
import { currencyFormat } from '../../utils';
import { ProductButton } from '../ProductsButton/ProductButton';
import { ColorVariation } from './ColorVariation';
import { SizeVariations } from './SizeVariations';
import styles from './variationSelector.module.css';

type VariationSelectorProps = {
  showVariation: string;
  setShowVariation: React.Dispatch<React.SetStateAction<string>>;
};

export const VariationSelector = (props: VariationSelectorProps) => {
  const { showVariation, setShowVariation } = props;
  const [productId, setProductId] = useState('');
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Values[]>();
  const [selectedSize, setSelectedSize] = useState<Values[]>();
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({
    imageUrl: '',
    addToCartLink: '',
    isAvailable: true,
    price: 0,
    priceWithDiscount: 0,
    skuId: '',
  });

  const {
    setting: { kuikpay },
  } = useContext(ActionsContext);

  const { product, loading } = useFetchProductById({
    productId,
  });

  useEffect(() => {
    if (showVariation) setProductId(showVariation);
  }, [showVariation]);

  useEffect(() => {
    if (loading) {
      setShow(loading);
    }
  }, [loading]);

  useEffect(() => {
    setIsAvailable(true);

    const selectedVariations = selectedColor
      ? selectedColor?.concat(selectedSize || [])
      : selectedSize;

    let filterProduct = product?.items;
    let isVariation = '';
    const productSelect = selectedVariations?.map(variation => {
      const items = filterProduct?.filter(item => {
        isVariation = item[variation.variationName || ''];

        if (isVariation)
          return item[variation.variationName || ''][0] === variation?.name;

        return false;
      });

      if (items?.length) {
        filterProduct = items;
      } else {
        if (isVariation) setIsAvailable(false);
      }

      return filterProduct;
    });

    if (productSelect) {
      const selectedProduct = filterProduct?.map(filter => {
        return {
          imageUrl: filter.images[0].imageUrl,
          addToCartLink: filter.sellers[0].addToCartLink,
          isAvailable: filter.sellers[0]?.commertialOffer.IsAvailable,
          price: filter.sellers[0]?.commertialOffer.ListPrice,
          priceWithDiscount: filter.sellers[0]?.commertialOffer.Price,
          skuId: filter.itemId,
        };
      });

      if (selectedProduct) setSelectedProduct(selectedProduct[0]);
    }
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    if (!product?.variationSelector) {
      const selectedProduct = product?.items?.map(filter => {
        return {
          imageUrl: filter.images[0].imageUrl,
          addToCartLink: filter.sellers[0].addToCartLink,
          isAvailable: filter.sellers[0]?.commertialOffer.IsAvailable,
          price: filter.sellers[0]?.commertialOffer.ListPrice,
          priceWithDiscount: filter.sellers[0]?.commertialOffer.Price,
          skuId: filter.itemId,
        };
      });

      if (selectedProduct) setSelectedProduct(selectedProduct[0]);
    } else if (product.variationSelector.length === 0) {
      setSelectedProduct({
        imageUrl: product.imageUrl,
        addToCartLink: product.addToCartLink,
        isAvailable: product.isAvailable,
        price: product.price,
        priceWithDiscount: product.priceWithDiscount,
        skuId: product.id,
      });
    }
  }, [product]);

  const handleClose = () => {
    setShow(false);
    setShowVariation('');
    setProductId('');
    setSelectedSize([]);
    setSelectedColor([]);
  };

  return (
    <Transition in={show} timeout={150}>
      <CSSTransition in={show} timeout={100} unmountOnExit>
        <Fragment>
          <div className={styles.variationSelector}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.productDetail}>
                  <button className={styles.closeCardBtn} onClick={handleClose}>
                    <IconClose />
                  </button>
                  <div className={styles.productPictureContainer}>
                    <img
                      className={styles.productPicture}
                      src={selectedProduct.imageUrl}
                    />
                  </div>
                  <div className={styles.productDetailInfo}>
                    <div className={styles.productContainer}>
                      <div className={styles.productInfo}>
                        <h2 className={styles.productTitle}>{product?.name}</h2>
                        <span>
                          {selectedProduct?.price !==
                            selectedProduct?.priceWithDiscount && (
                            <span className={styles.productPrice}>
                              {currencyFormat(selectedProduct?.price)}
                            </span>
                          )}
                        </span>
                        <span className={styles.productDiscountPrice}>
                          {currencyFormat(selectedProduct?.priceWithDiscount)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      {show &&
                      product &&
                      product.variationSelector &&
                      product.variationSelector?.length > 0 ? (
                        <div className={styles.variationContent}>
                          <ColorVariation
                            variations={product.variationSelector || []}
                            setSelectedColor={setSelectedColor}
                          />
                        </div>
                      ) : null}

                      {show &&
                      product &&
                      product.variationSelector &&
                      product.variationSelector?.length > 0 ? (
                        <SizeVariations
                          variations={product.variationSelector || []}
                          setSelectedSize={setSelectedSize}
                          selectedSize={selectedSize || []}
                        />
                      ) : null}
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <div className={styles.productAddCartContent}>
                          <div className={styles.buttonGroup}>
                            <ProductButton
                              product={{
                                id: product?.id || '',
                                name: product?.name || '',
                                price: selectedProduct.price,
                                priceWithDiscount:
                                  selectedProduct.priceWithDiscount,
                                imageUrl: selectedProduct.imageUrl,
                                addToCartLink: selectedProduct.addToCartLink,
                                items: product?.items || [],
                                isAvailable: isAvailable
                                  ? selectedProduct.isAvailable
                                  : false,
                                variationSelector:
                                  product?.variationSelector || [],
                                pdpLink: product?.pdpLink || '',
                                skuId: selectedProduct.skuId,
                              }}
                              handleClose={handleClose}
                            />
                          </div>
                          {kuikpay && (
                            <KuikPayButton
                              product={{
                                id: product?.id || '',
                                name: product?.name || '',
                                price: selectedProduct.price,
                                priceWithDiscount:
                                  selectedProduct.priceWithDiscount,
                                imageUrl: selectedProduct.imageUrl,
                                addToCartLink: selectedProduct.addToCartLink,
                                items: product?.items || [],
                                isAvailable: isAvailable
                                  ? selectedProduct.isAvailable
                                  : false,
                                variationSelector:
                                  product?.variationSelector || [],
                                pdpLink: product?.pdpLink || '',
                                skuId: selectedProduct.skuId,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.backdropContainer} onClick={handleClose} />
          </div>
        </Fragment>
      </CSSTransition>
    </Transition>
  );
};
