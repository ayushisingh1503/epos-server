import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { getClient } from "../utilities/dbclient.js";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

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

export const getList = async (storeId) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":storeId": { S: storeId },
    },
    KeyConditionExpression: "store_id = :storeId",
    TableName: "users",
    IndexName: "store_id-created_at-index",
  };

  try {
    const data = await dynamodb.send(new QueryCommand(params));

    return unmarshall(data?.Items);
  } catch (err) {
    console.log("Error:", err);
  }
};

export const create = async (userPayload) => {
  const dynamodb = getClient();
  const items = {
    TableName: "users",
    Item: userPayload,
  };

  return await dynamodb.send(new PutCommand(items));
};
