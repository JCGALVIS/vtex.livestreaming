import { configDev } from './dev'
import { configProd } from './prod'

export { configDev } from './dev'
export { configProd } from './prod'

const { ENVIROMENT } = process.env

export const config = ENVIROMENT === 'prod' ? configProd : configDev
