import { docClient } from '../utils/documentClient'

declare interface Params {
  TableName: string
  FilterExpression?: string | undefined
  UpdateExpression?: string | undefined
  Key?: any | undefined
  ExpressionAttributeNames?: any | undefined
  ExpressionAttributeValues?: any | undefined
  ProjectionExpression?: string | undefined
}

export const getData = async ({
  TableName,
  FilterExpression,
  UpdateExpression,
  Key,
  ExpressionAttributeNames,
  ExpressionAttributeValues,
  ProjectionExpression
}: Params) => {
  const params = {
    TableName,
    FilterExpression,
    UpdateExpression,
    Key,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ProjectionExpression
  }

  const { Item } = await docClient.get(params).promise()

  return Item

}
