import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context, callback) {

  let params = {
    TableName: process.env.tableName,
  };

  if (event.queryStringParameters && event.queryStringParameters.userId) {
    params = {
      TableName: process.env.tableName,
      FilterExpression: "#field = :value",
      ExpressionAttributeNames: {
        "#field": 'userId'
      },
      ExpressionAttributeValues: {
        ":value": event.queryStringParameters.userId
      }
    };
  } else if(event.queryStringParameters && event.queryStringParameters.boatId) {
    params = {
      TableName: process.env.tableName,
      FilterExpression: "#field = :value",
      ExpressionAttributeNames: {
        "#field": 'boatId'
      },
      ExpressionAttributeValues: {
        ":value": event.queryStringParameters.boatId
      }
    };
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}