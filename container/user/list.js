import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context, callback) {
  let params = {
    TableName: "users",
  };

  if (event.queryStringParameters && event.queryStringParameters.email) {
    params = {
      TableName: "users",
      FilterExpression: "#userField = :userValue",
      ExpressionAttributeNames: {
        "#userField": 'userEmail'
      },
      ExpressionAttributeValues: {
        ":userValue": event.queryStringParameters.email
      }
    }
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}