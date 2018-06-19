import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      boatId: event.pathParameters.id,
    },
    UpdateExpression: "SET boatName = :boatName, model = :model, builder = :builder, boatLength = :boatLength, boatWidth = :boatWidth, seats = :seats, cabin = :cabin, mooringPlace = :mooringPlace, equipment = :equipment, quote = :quote, slots = :slots, lastMinutes = :lastMinutes, rowLimit = :rowLimit, boatEnable = :boatEnable, boatUsers = :boatUsers, userId = :userId, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":boatName": data.boatName ? data.boatName : null,
      ":model": data.model ? data.model : null,
      ":builder": data.builder ? data.builder : null,
      ":boatLength": data.boatLength ? data.boatLength : null,
      ":boatWidth": data.boatWidth ? data.boatWidth : null,
      ":seats": data.seats ? data.seats : null,
      ":cabin": data.cabin ? data.cabin : null,
      ":mooringPlace": data.mooringPlace ? data.mooringPlace : null,
      ":equipment": data.equipment ? data.equipment : null,
      ":quote": data.quote ? data.quote : null,
      ":slots": data.slots ? data.slots : null,
      ":lastMinutes": data.lastMinutes ? data.lastMinutes : null,
      ":rowLimit": data.rowLimit ? data.rowLimit : null,
      ":boatEnable": data.boatEnable ? data.boatEnable : false,
      ":userId": data.userId,
      ":boatUsers": data.boatUsers ? data.boatUsers : [],
      ":updatedAt": Date.now()
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