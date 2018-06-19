import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      reservationId: event.pathParameters.id
    },
    ConditionExpression: "boatId = :boatId",
    UpdateExpression: "SET startDate = :startDate, endDate = :endDate, confirmed = :confirmed, slots = :slots, classes = :classes, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":startDate": data.startDate ? data.startDate : null,
      ":endDate": data.endDate ? data.endDate : null,
      ":confirmed": data.confirmed ? data.confirmed : false,
      ":slots": data.slots ? data.slots : null,
      ":classes": data.classes,
      ":updatedAt": Date.now(),
      ":boatId": data.boatId,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}