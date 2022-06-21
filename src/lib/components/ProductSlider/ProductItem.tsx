import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { KuikPayButton } from '..';
import type { Product } from '../../../typings/livestreaming'
import { ActionsContext } from '../../context/ActionsContext';
import { currencyFormat } from '../../utils';
import { ProductButton } from '../ProductsButton/ProductButton';
import { ProductVariationButton } from '../ProductsButton/ProductVariationButton';
import styles from './productSlider.module.css';

const SPANISH_CODE = 'es'

type ProductItemProps = {
  product: Product
  variationSelectorState: [string, React.Dispatch<React.SetStateAction<string>>]
  sectionIdClickedOn?: string
}

export const ProductItem = (props: ProductItemProps) => {
  const { product, sectionIdClickedOn, variationSelectorState } = props
  const { name, price, priceWithDiscount, imageUrl, pdpLink } = product

  const {
    setting: { kuikpay }
  } = useContext(ActionsContext)

  const { formatMessage, locale } = useIntl();
  const isSpanish = locale === SPANISH_CODE;
  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a
          className={styles.productLink}
          href={pdpLink}
          target="_blank"
          rel="noreferrer"
        >
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <h4 className={styles.productTitle}>{name}</h4>
        {price !== priceWithDiscount && (
          <span className={styles.price}>
            {isSpanish ? formatMessage({ id: 'store/text.before' }) + ': ' : ''}
            {currencyFormat(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          {isSpanish ? formatMessage({ id: 'store/text.now' }) + ': ' : ''}
          {currencyFormat(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          <ProductButton
            product={product}
            variationSelectorState={variationSelectorState}
            sectionIdClickedOn={sectionIdClickedOn}
          />
          {kuikpay && <KuikPayButton product={product} />}
        </div>
      </div>
    </div>
  );
};
