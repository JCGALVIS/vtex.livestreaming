/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import { cartSimulation } from '../../services'
import type { Products } from '../../typings/livestreaming'
import { Kuikpay, KuikpayWrapper } from 'kuikpay-sdk'
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

  const listendCheckout = () => {
    $(window).on('orderFormUpdated.vtex', (_: any, orderFormData: any) => {
      setOrderForm(orderFormData)
    })
  }

  useEffect(() => {
    listendCheckout()
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
      items: orderForm?.items?.map((item: any, index: any) => ({
        ...item,
        sellingPrice: item.sellingPrice / 100,
        index
      })),
      totalizers: orderForm?.totalizers?.map((totalizer: any) => {
        return {
          ...totalizer,
          value: totalizer.value / 100
        }
      }),
      value: orderForm.value / 100
    }

    setOrder(formattedOrderForm)
  }, [orderForm])

  const handleAddToCart = (item: any) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.addToCart([item])
    })
  }

  // Function to remove all items from the cart after finalizing the order
  const handleClearItems = () => {
    vtexjs.checkout.removeAllItems()
  }

  // Function to update items quantity in order form
  const handleUpdateItems = (items: any) => {
    const itemsInfo = items.map((item: any) => {
      return { index: item.index, quantity: item.quantity }
    })

    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.updateItems(itemsInfo, null, false)
    })
  }

  // Function to update order form profile
  const handleUpdateOrderFormProfile = (profile: any) => {
    vtexjs.checkout.getOrderForm().then(() => {
      return vtexjs.checkout.sendAttachment('clientProfileData', profile)
    })
  }

  const runtime = {
    account: vtxctx.url.split('.')[0],
    workspace: 'master'
  }

  const itemsLength = product?.items?.length || 0
  const multipleAvailableSKUs = itemsLength > 1

  return (
    <div className={styles.kuikpay}>
      <KuikpayWrapper
        updateSelectedAddress={() => {}}
        updateOrderFormProfile={handleUpdateOrderFormProfile}
        cartSimulation={cartSimulation}
        theme='kuikpay'
        runtime={runtime}
      >
        <Kuikpay
          addToCart={handleAddToCart}
          itemToAdd={itemToAdd}
          updateItems={handleUpdateItems}
          orderForm={order}
          clearData={handleClearItems}
          multipleAvailableSKUs={multipleAvailableSKUs}
        />
      </KuikpayWrapper>
    </div>
  )
}
