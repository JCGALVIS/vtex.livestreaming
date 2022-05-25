import { useIntl } from 'react-intl'
import { useActions, useSettings } from '../context'
import { Product } from '../typings/livestreaming'

enum OriginOfProducts {
  CACE = 'CACE',
  GLOBAL_PAGE = 'globalPage'
}

type AddToCartProps = {
  product: Product
  variationSelectorState?: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ]
}

const error = (message: string, ...args: any[]) =>
  console.error(`[useAddToCart] ${message}`, ...args)

export const useAddToCart = (props: AddToCartProps) => {
  const { product } = props
  const { setting } = useActions()
  const { setAlertMessage } = useSettings()
  const { formatMessage } = useIntl()
  const thereAreVariations = !!product?.variationSelector?.length
  const isCACE = setting.originOfProducts === OriginOfProducts.CACE
  const { showQuickView, addToCart: addToCartCallback, redirectTo } = setting
  const { addToCartLink, pdpLink } = product

  const defaultErrorMessage = formatMessage({
    id: 'store/text.add-to-cart-error'
  })

  const messages = {
    errorAddingToCart: defaultErrorMessage,
    errorOpeningQuickView: defaultErrorMessage,
    errorOpeningNewTab: defaultErrorMessage,
    successAddingToCart: formatMessage({ id: 'store/text.add-to-cart' })
  }

  const variationSelectorStateNotValid = () => {
    error('variationSelectorState is required for open the quick view')
    showErrorMessage(messages.errorOpeningQuickView)
  }

  const [
    showVariationSelector = '', // This is the product id
    setShowVariationSelector = variationSelectorStateNotValid
  ] = props.variationSelectorState || []

  const openCheckoutTab = () => openNewTab(addToCartLink)
  const openProductDetailTab = () => openNewTab(pdpLink)

  function addToCart() {
    if (isCACE) {
      // The PDP link of a CACE product comes in the "addToCartLink"
      openCheckoutTab()
    } else if (!showVariationSelector && thereAreVariations) {
      if (showQuickView) {
        setShowVariationSelector(product.id)
      } else {
        openProductDetailTab()
      }
    } else if (redirectTo && (!thereAreVariations || showVariationSelector)) {
      openCheckoutTab()
    } else {
      runAddToCartCallback()
    }
  }

  function openNewTab(link: string) {
    if (link) {
      window.open(link, '_blank')
    } else {
      error(`The link "${link}" is invalid`)
      showErrorMessage(messages.errorOpeningNewTab)
    }
  }

  function showSuccessMessage(value: string) {
    setAlertMessage({ type: 'success', value })
  }

  function showErrorMessage(value: string) {
    setAlertMessage({ type: 'error', value })
  }

  function runAddToCartCallback() {
    try {
      addToCartCallback(product)
      showSuccessMessage(messages.successAddingToCart)
    } catch (err) {
      error('Error running the native add to cart function:\n', err)
      showErrorMessage(messages.errorAddingToCart)
    }
  }

  return addToCart
}
