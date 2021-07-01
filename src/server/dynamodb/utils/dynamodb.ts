export const dynamoCredentials = {
  region: {
    name: 'us-east-1',
    endPoint: 'http://dynamodb.us-east-1.amazonaws.com'
  },
  credentials: {
    accessKeyId: 'AKIAVF6T6DHULDX5I3NA',
    secretAccessKey: '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'
  }
}

export const dynamoTablesName = {
  LIVESTREAMINGS_TABLE: 'livestreaming',
  LOGS_TABLE: 'livestreaming-logs',
  DIRTYWORDS_TABLE: 'livestreaming-dirtywords',
  REPORTS_TABLE: 'livestreaming-reports',
  ACCOUNTS_AVAILABLE_TABLE: 'livestreaming-accounts-availables',
  ORDERS_REPORTS_TABLE: 'livestreaming-reports'
}

export const getEnvironmentTable = (production: boolean, tableName: any) =>
  production ? tableName : `${tableName}-dev`
