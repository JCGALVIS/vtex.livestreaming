/* eslint-disable no-unused-vars */
import { Kuikpay, KuikpayWrapper } from 'kuikpay-sdk';
import 'kuikpay-sdk/dist/index.css';
import type {
  Item,
  ItemToAdd,
  ItemToRemove,
  OfferingInput,
  Totalizer,
} from 'kuikpay-sdk/dist/interfaces';
import { useEffect, useState } from 'react';
import type { Products } from '../../../typings/livestreaming';
import type { Profile } from '../../interfaces';
import { cartSimulation } from '../../services';
import styles from './kuikPayButton.module.css';

const windowInfo: any = window;
const { vtexjs, vtxctx } = windowInfo;

type KuikPayButtonProps = {
  product: Products;
};

export const KuikPayButton = (props: KuikPayButtonProps) => {
  const { product } = props;

  const [orderForm, setOrderForm] = useState<any>({});
  const [order, setOrder] = useState<any | null>(null);

  // Item to add to cart
  const itemToAdd = {
    id: Number(product.skuId),
    quantity: 1,
    seller: '1',
  };

  const listendCheckout = (_: any, orderFormData: any) => {
    setOrderForm(orderFormData);
  };

  useEffect(() => {
    $(window).on('orderFormUpdated.vtex', listendCheckout);

    return () => {
      $(window).off('orderFormUpdated.vtex', listendCheckout);
    };
  }, []);

  useEffect(() => {
    const formattedOrderForm = {
      clientProfileData: {
        email: orderForm.clientProfileData?.email,
      },
      shippingData: {
        selectedAddress: {
          addressId: orderForm.selectedAddress?.addressId || '',
          addressType: orderForm.selectedAddress?.addressType || '',
          city: orderForm.selectedAddress?.city || '',
          complement: orderForm.selectedAddress?.complement || '',
          country: orderForm.selectedAddress?.country || '',
          geoCoordinates: orderForm.selectedAddress?.geoCoordinates || '',
          isDisposable: orderForm.selectedAddress?.isDisposable || '',
          neighborhood: orderForm.selectedAddress?.neighborhood || '',
          number: orderForm.selectedAddress?.number || '',
          postalCode: orderForm.selectedAddress?.postalCode || '',
          receiverName: orderForm.selectedAddress?.receiverName || '',
          reference: orderForm.selectedAddress?.reference || '',
          state: orderForm.selectedAddress?.state || '',
          street: orderForm.selectedAddress?.street || '',
          completed: false || '',
        },
      },
      items: orderForm?.items?.map((item: Item, index: number) => ({
        ...item,
        sellingPrice: item.sellingPrice / 100,
        price: item.price && item.price / 100,
        index,
      })),
      totalizers: orderForm?.totalizers?.map((totalizer: Totalizer) => {
        return {
          ...totalizer,
          value: totalizer.value / 100,
        };
      }),
      value: orderForm.value / 100,
      messages: orderForm.messages?.couponMessages
        ? orderForm.messages?.couponMessages
        : orderForm.messages,
      marketingData: {
        coupon: orderForm.marketingData?.coupon,
      },
    };

    setOrder(formattedOrderForm);
  }, [orderForm]);

  const handleAddToCart = (item: ItemToAdd) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addToCart([item]);
    });
  };

  // Function to remove all items from the cart after finalizing the order
  const handleClearItems = (_items: ItemToRemove[]) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.removeAllItems();
    });
  };

  // Function to update items quantity in order form
  const handleUpdateItems = (items: ItemToRemove[]) => {
    const itemsInfo = items.map((item: ItemToRemove) => {
      return { index: item.index, quantity: item.quantity };
    });

    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.updateItems(itemsInfo, null, false);
    });
  };

  // Function to update order form profile
  const handleUpdateOrderFormProfile = (profile: Profile) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.sendAttachment('clientProfileData', profile);
    });
  };

  const handleInsertCoupon = (text: string) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addDiscountCoupon(text);
    });
  };

  const handleAddItemOffering = ({ offeringId, itemIndex }: OfferingInput) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addOffering(offeringId, itemIndex);
    });
  };

  const handleRemoveItemOffering = ({
    offeringId,
    itemIndex,
  }: OfferingInput) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.removeOffering(offeringId, itemIndex);
    });
  };

  const clearOrderFormProfile = async () => {
    const clientProfileData = orderForm?.clientProfileData;

    if (clientProfileData) {
      const changeToAnonymousUserURL =
        await vtexjs.checkout.getChangeToAnonymousUserURL();

      fetch(changeToAnonymousUserURL, {
        method: 'GET',
        redirect: 'follow',
      }).then(() => {
        vtexjs.checkout.getOrderForm().then((e: any) => {
          listendCheckout('', e);
        });
      });
    }
  };

  const runtime = {
    account: vtxctx.url.split('.')[0],
    workspace: 'master',
    platform: 'vtex-cms',
  };

  return (
    <div className={styles.kuikpay}>
      <KuikpayWrapper
        updateSelectedAddress={() => {}}
        cartSimulation={cartSimulation}
        theme="kuikpay"
        runtime={runtime}
        insertCoupon={handleInsertCoupon}
        addItemOffering={handleAddItemOffering}
        removeItemOffering={handleRemoveItemOffering}
        updateOrderFormProfile={handleUpdateOrderFormProfile}
        updateItems={handleUpdateItems}
        clearData={handleClearItems}
        orderForm={order}
        addToCart={handleAddToCart}
        sandbox
        clearOrderFormProfile={clearOrderFormProfile}
      />
      <Kuikpay
        addToCart={handleAddToCart}
        itemToAdd={itemToAdd}
        multipleAvailableSKUs={false}
        isVisible
        onClickBehavior="ensure-sku-selection"
        runtime={runtime}
        sandbox
      />
    </div>
  );
};
