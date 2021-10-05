import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import addToCartMutation from 'vtex.checkout-resources/MutationAddToCart'
import updateItemsMutation from 'vtex.checkout-resources/MutationUpdateItems'
import updateOrderFormProfileMutation from 'vtex.checkout-resources/MutationUpdateOrderFormProfile'

import { Kuikpay } from 'kuikpay-sdk'
import 'kuikpay-sdk/dist/index.css'

import { formatterDolar } from '../../utils'
import ProductButton from './../ProductsButton/ProductButton'

import styles from './productSlider.css'

type ProductItemProps = {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  isAvailable: boolean
  pdp: boolean
}

interface ItemToAdd {
  id: number
  quantity: number
  seller?: string
}

export interface ItemToRemove {
  id?: number
  index?: number
  quantity: number
  seller?: string
  uniqueId: string
}


export const ProductItem = (props: ProductItemProps) => {
  const {
    id,
    name,
    price,
    priceWithDiscount,
    imageUrl,
    addToCartLink,
    isAvailable,
    pdp
  } = props

  const [order, setOrder] = useState<any | null>(null)

  const { orderForm, loading, setOrderForm } = useOrderForm()

  const [addToCart] = useMutation(addToCartMutation)
  const [updateItems] = useMutation(updateItemsMutation)
  const [updateOrderFormProfile] = useMutation(updateOrderFormProfileMutation)

  const handleAddToCart = (item: ItemToAdd) => {
    const id: number = +item.id

    addToCart({
      variables: {
        items: [
          {
            id,
            quantity: item.quantity,
            seller: item.seller
          }
        ]
      }
    }).then((data: any) => setOrderForm(data.data.addToCart))
  }

  const handleUpdateItems = (items: ItemToRemove[]) => {
    updateItems({
      variables: {
        orderItems: items,
      },
    }).then((data: any) => setOrderForm(data.data.updateItems))
  }

  const handleClearItems = (items: ItemToRemove[]) => {
    updateItems({
      variables: {
        orderItems: items,
      },
    }).then((data: any) => setOrderForm(data.data.updateItems))
  }

  const handleUpdateOrderFormProfile = (profile: any) => {
    updateOrderFormProfile({
      variables: {
        profile,
      },
    })
  }

  const cartSimulation = async (body: any) => {
    const myHeaders = new Headers()

    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify(body)

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    const response = await fetch(
      '/api/checkout/pub/orderforms/simulation',
      requestOptions
    )

    return response
  }

  useEffect(() => {
    if (loading) return

    const itemsFormatted = orderForm.items.map((item: any) => {
      return {
        uniqueId: item.uniqueId,
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice / 100,
        imageUrl: item.imageUrls.at1x,
        availability: item.availability,
        seller: item.seller
      }
    })

    const totalizersFormatted = orderForm.totalizers?.map((totalizer: any) => {
      return {
        ...totalizer,
        value: totalizer.value / 100
      }
    })

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
      items: itemsFormatted,
      totalizers: totalizersFormatted,
      value: orderForm.value / 100
    }

    setOrder(formattedOrderForm)
  }, [loading, orderForm])

  if (loading) return null

  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a className={styles.productLink} href={addToCartLink}>
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <h4 className={styles.productTitle}>{name}</h4>
        {price !== priceWithDiscount && (
          <span className={styles.price}>
            De {formatterDolar.format(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          Para {formatterDolar.format(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          <ProductButton
            addToCartLink={addToCartLink}
            isAvailable={isAvailable}
            pdp={pdp}
            productId={id}
          />
          NO SHÉ VE
          <Kuikpay
            addToCart={handleAddToCart}
            updateItems={handleUpdateItems}
            orderForm={order}
            updateSelectedAddress={() => {}}
            updateOrderFormProfile={handleUpdateOrderFormProfile}
            cartSimulation={cartSimulation}
            clearData={handleClearItems}
            theme={'kuikpay'}
          />
        </div>
      </div>
    </div>
  )
}
