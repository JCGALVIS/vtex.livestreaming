/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { cartSimulation } from '../../services'
import type { Profile } from '../../interfaces'
import type { Products } from '../../typings/livestreaming'
import { Kuikpay, KuikpayWrapper } from 'kuikpay-sdk'
import type {
  Item,
  ItemToAdd,
  ItemToRemove,
  OfferingInput,
  Totalizer
} from 'kuikpay-sdk/dist/interfaces'
import 'kuikpay-sdk/dist/index.css'

import styles from './kuikPayButton.css'

const windowInfo: any = window
const { vtexjs, vtxctx } = windowInfo

type KuikPayButtonProps = {
  product: Products
}

export const KuikPayButton = (props: KuikPayButtonProps) => {
  const { product } = props

  const [orderForm, setOrderForm] = useState<any>({})
  const [order, setOrder] = useState<any | null>(null)

  // Item to add to cart
  const itemToAdd = {
    id: Number(product.skuId),
    quantity: 1,
    seller: '1'
  }

  useEffect(() => {
    vtexjs.checkout
      .getOrderForm()
      .then((orderForm: any) => setOrderForm(orderForm))
  }, [])

  useEffect(() => {
    const formattedOrderForm = {
      clientProfileData: {
        email: orderForm.clientProfileData?.email
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
          completed: false || ''
        }
      },
      items: orderForm?.items?.map((item: Item, index: number) => ({
        ...item,
        sellingPrice: item.sellingPrice / 100,
        price: item.price && item.price / 100,
        index
      })),
      totalizers: orderForm?.totalizers?.map((totalizer: Totalizer) => {
        return {
          ...totalizer,
          value: totalizer.value / 100
        }
      }),
      value: orderForm.value / 100,
      messages: orderForm.messages?.couponMessages
        ? orderForm.messages?.couponMessages
        : orderForm.messages,
      marketingData: {
        coupon: orderForm.marketingData?.coupon
      }
    }

    setOrder(formattedOrderForm)
  }, [orderForm])

  const handleAddToCart = (item: ItemToAdd) => {
    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout
        .addToCart([item])
        .done((orderForm: any) => setOrderForm(orderForm))
    })
  }

  // Function to remove all items from the cart after finalizing the order
  const handleClearItems = () => {
    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout
        .removeAllItems()
        .done((orderForm: any) => setOrderForm(orderForm))
    })
  }

  // Function to update items quantity in order form
  const handleUpdateItems = (items: ItemToRemove[]) => {
    const itemsInfo = items.map((item: ItemToRemove) => {
      return { index: item.index, quantity: item.quantity }
    })

    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout
        .updateItems(itemsInfo, null, false)
        .then((orderForm: any) => setOrderForm(orderForm))
    })
  }

  // Function to update order form profile
  const handleUpdateOrderFormProfile = (profile: Profile) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout
        .sendAttachment('clientProfileData', profile)
        .then((orderForm: any) => setOrderForm(orderForm))
    })
  }

  const handleInsertCoupon = (text: string) => {
    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout
        .addDiscountCoupon(text)
        .then((orderForm: any) => setOrderForm(orderForm))
    })
  }

  const handleAddItemOffering = ({ offeringId, itemIndex }: OfferingInput) => {
    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout
        .addOffering(offeringId, itemIndex)
        .then((orderForm: any) => setOrderForm(orderForm))
    })
  }

  const handleRemoveItemOffering = ({
    offeringId,
    itemIndex
  }: OfferingInput) => {
    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout
        .removeOffering(offeringId, itemIndex)
        .then((orderForm: any) => setOrderForm(orderForm))
    })
  }

  const runtime = {
    account: vtxctx.url.split('.')[0],
    workspace: 'master'
  }

  return (
    <div className={styles.kuikpay}>
      <KuikpayWrapper
        updateSelectedAddress={() => {}}
        cartSimulation={cartSimulation}
        theme='kuikpay'
        runtime={runtime}
      >
        <Kuikpay
          addToCart={handleAddToCart}
          addItemOffering={handleAddItemOffering}
          insertCoupon={handleInsertCoupon}
          itemToAdd={itemToAdd}
          updateOrderFormProfile={handleUpdateOrderFormProfile}
          updateItems={handleUpdateItems}
          orderForm={order}
          clearData={handleClearItems}
          multipleAvailableSKUs={false}
          removeItemOffering={handleRemoveItemOffering}
          isVisible
        />
      </KuikpayWrapper>
    </div>
  )
}
