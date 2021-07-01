export const dynamoCredentials = {
  region: {
    name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    endPoint: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  },
  credentials: {
    accessKeyId: 'xxxxxxxxxxxxx',
    secretAccessKey: 'xxxxxxxxxxxxxxxxxxxxx'
  }
}

export const dynamoTablesName = {
  LIVESTREAMINGS_TABLE: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  LOGS_TABLE: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  DIRTYWORDS_TABLE: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  REPORTS_TABLE: 'xxxxxxxxxxxxxxxxxxxxxx',
  ACCOUNTS_AVAILABLE_TABLE: 'xxxxxxxxxxxx',
  ORDERS_REPORTS_TABLE: 'xxxxxxxxxxxxxxxxxxxxx'
}

export const getEnvironmentTable = (production: boolean, tableName: any) =>
  production ? tableName : `${tableName}-dev`
