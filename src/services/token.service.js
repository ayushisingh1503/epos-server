import { getClient } from "../services/dbclient.js";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const saveToken = async (userid, rToken) => {
  const dynamodb = getClient();
  const items = {
    TableName: "user_token",
    Item: {
      user_id: userid,
      refresh_token: rToken,
    },
  };
  try {
    await dynamodb.send(new PutCommand(items));
    console.log("Item successfully added");
  } catch (err) {
    console.error("Error adding item:", err);
  }
};

export const getToken = async (userid) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":userid": { S: userid },
    },
    KeyConditionExpression: "user_id = :userid",
    TableName: "user_token",
  };

  try {
    const data = await dynamodb.send(new QueryCommand(params));

    return unmarshall(data?.Items?.[0]);
  } catch (err) {
    console.log("Error:", err);
  }
};
