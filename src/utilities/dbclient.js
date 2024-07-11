import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const getClient = () => {
  return new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });
};
