import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
import moment from 'moment-timezone';

export async function main(event, context, callback) {
  const date = moment().format('YYYY-M-D');
  const params = {
    TableName: "reservations",
    FilterExpression: "startDate <= :startDate",
    ExpressionAttributeValues: {
      ":startDate": date
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    //callback(null, success(result.Items));

    for (let res in result.Items) {
      // const item = result.Items[res];
      const item = result.Items[0];
      console.log(item);
      
      const userParams = {
        TableName: "users",
        Key: {
          userId: item.userId
        }
      };

      const userResult = await dynamoDbLib.call("get", userParams);

      console.log('user',userResult.Item.boats[item.boatId].slots);

      const slots = conferma(userResult.Item.boats[item.boatId], item)
      console.log('slots', slots);
      console.log('userPost', userResult.Item.boats[item.boatId].slots);
    }

  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
  
}

const conferma = (userSlots, res) => {

  let totPren = 0;
  for(let k in res.slots) {
    if(res.slots[k] !== null) {
      totPren += res.slots[k].numResWE.reduce((acc, val) => { return acc + val; });
      totPren += res.slots[k].numResWD.reduce((acc, val) => { return acc + val; });
      totPren += res.slots[k].numResWH.reduce((acc, val) => { return acc + val; });
    }
  }

  userSlots.prenotazioni.totPrenotato += totPren;
  return userSlots;
};