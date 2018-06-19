import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-1" });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

export function createUser(){
  let params = {
    UserPoolId: process.env.userPoolId,
    Username: 'sanvisimo@yahoo.it',
    DesiredDeliveryMediums: [
      'EMAIL',
    ],
    ForceAliasCreation: true,
    TemporaryPassword: 'STRING_VALUE',
    UserAttributes: [
      {
        Name: 'first_name', /* required */
        Value: 'Sanvisimo'
      },
      {
        Name: 'last_name', /* required */
        Value: 'Yahoo'
      },
      {
        Name: 'email',
        Value: 'sanvisimo@yahoo.it'
      }
    ]
  };
  const cognito= new AWS.CognitoIdentityServiceProvider();
  return cognito.adminCreateUser(params).promise();
}
