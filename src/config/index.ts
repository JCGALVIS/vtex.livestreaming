import { configDev } from './dev'
import { configProd } from './prod'

export { configDev } from './dev'
export { configProd } from './prod'

let INFRA_ENVIRONMENT = '__ENVIRONMENT'
const { ENVIRONMENT: NODE_ENVIRONMENT } = process.env

if (NODE_ENVIRONMENT && NODE_ENVIRONMENT !== INFRA_ENVIRONMENT) {
  INFRA_ENVIRONMENT = NODE_ENVIRONMENT
}

export const config = INFRA_ENVIRONMENT === 'prod' ? configProd : configDev
