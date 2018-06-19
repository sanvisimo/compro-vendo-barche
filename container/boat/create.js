import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: data.email,
      boatId: uuid.v1(),
      boatName: data.boatName,
      model: data.model,
      builder: data.builder,
      boatLength: data.boatLength,
      boatWidth: data.boatWidth,
      seats: data.seats,
      cabin: data.cabin,
      mooringPlace: data.mooringPlace,
      equipment: data.equipment,
      quote: data.quote,
      slots: data.slots,
      lastMinutes: data.lastMinutes,
      rowLimit: data.rowLimit,
      boatEnable: false,
      boatUsers: data.boatUsers,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}