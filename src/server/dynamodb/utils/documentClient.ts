import AWS from 'aws-sdk'
import { dynamoCredentials } from './dynamodb'

const awsConfig = {
  region: dynamoCredentials.region.name,
  endpoint: dynamoCredentials.region.endPoint,
  accessKeyId: dynamoCredentials.credentials.accessKeyId,
  secretAccessKey: dynamoCredentials.credentials.secretAccessKey
}
AWS.config.update(awsConfig)

export const docClient = new AWS.DynamoDB.DocumentClient()
