/* eslint-disable no-unused-vars */
import type { OptionsCurrency } from './../typings/livestreaming'
import constants from './constant'

export const currencyFormat = (number: number) => {
  const { currencyFormat, currencySymbol } = constants

  const options: OptionsCurrency = {
    numberOfDecimals: currencyFormat ? currencyFormat.CurrencyDecimalDigits : 2,
    decimalSeparator: currencyFormat
      ? currencyFormat.CurrencyDecimalSeparator
      : '.',
    thousandsSeparator: currencyFormat
      ? currencyFormat.CurrencyGroupSeparator
      : ',',
    symbol: currencyFormat ? currencySymbol : '$',
    positionSymbol: currencyFormat
      ? currencyFormat.StartsWithCurrencySymbol
        ? 'i'
        : 'd'
      : 'i'
  }

  const FIGURES_MILES = currencyFormat ? currencyFormat.CurrencyGroupSize : 3

  const numberAsString = number.toFixed(options.numberOfDecimals)

  let separatorPosition = numberAsString.indexOf(options.decimalSeparator)

  if (separatorPosition === -1) separatorPosition = numberAsString.length
  let formattedWithoutDecimals = ''
  let index = separatorPosition

  while (index >= 0) {
    const lowerLimit = index - FIGURES_MILES
    formattedWithoutDecimals =
      (lowerLimit > 0 ? options.decimalSeparator : '') +
      numberAsString.substring(lowerLimit, index) +
      formattedWithoutDecimals
    index -= FIGURES_MILES
  }

  formattedWithoutDecimals = formattedWithoutDecimals.replace(
    options.thousandsSeparator,
    ''
  )

  const formattedWithoutSymbol = `${formattedWithoutDecimals}${numberAsString.substr(
    separatorPosition,
    options.numberOfDecimals + 1
  )}`

  return options.positionSymbol === 'i'
    ? options.symbol + formattedWithoutSymbol
    : formattedWithoutSymbol + options.symbol
}
