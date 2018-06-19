import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context, callback) {
  let params = {
    TableName: process.env.tableName,
  };

  if (event.queryStringParameters && event.queryStringParameters.userId) {
    params = {
      TableName: process.env.tableName,
      FilterExpression: "contains (#users, :userId)",
      ExpressionAttributeNames: {
        "#users": "boatUsers",
      },
      ExpressionAttributeValues: {
        ":userId": event.queryStringParameters.userId
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