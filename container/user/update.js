import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "users",
    Key: {
      userId: data.userId,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET userAdmin = :userAdmin, boats = :boats, username = :username, color = :color, userEnabled = :userEnabled, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":userAdmin": data.userAdmin ? data.userAdmin : false,
      ":boats": data.boats ? data.boats : null,
      ":username": data.username ? data.username : null,
      ":color": data.color ? data.color : null,
      ":userEnabled": data.userEnabled ? data.userEnabled : false,
      ":updatedAt": Date.now()
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
}