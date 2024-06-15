import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getClient = () => {
  return new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });
};

export const getUserByEmail = async (email) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":emailid": { S: email },
    },
    KeyConditionExpression: "email = :emailid",
    TableName: "users",
    IndexName: "email-index",
  };

  try {
    const data = await dynamodb.send(new QueryCommand(params));

    return unmarshall(data?.Items?.[0]);
  } catch (err) {
    console.log("Error:", err);
  }
};
