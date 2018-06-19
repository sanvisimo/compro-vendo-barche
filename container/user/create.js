import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import uuid from "uuid";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // const params = {
  //   TableName: "users",
  //   Item: {
  //     userId: uuid.v1(),
  //     userEmail: data.email,
  //     boats: data.boats,
  //     username: data.username,
  //     userAdmin: false,
  //     userEnabled: false,
  //     createdAt: Date.now()
  //   }
  // };
  console.log('por', process.env.tableName)
  console.log('por', process.env.userPoolId)

  try {
    // await dynamoDbLib.call("put", params);
    let user = await dynamoDbLib.createUser();

    callback(null, success(user));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
}