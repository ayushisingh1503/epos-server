import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { getClient } from "../services/dbclient.js";

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
