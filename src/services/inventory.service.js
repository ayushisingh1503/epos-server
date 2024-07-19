import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { getClient } from "../utilities/dbclient.js";
import {
  DeleteCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { generateUpdateExpression } from "../utilities/update-expression.js";

export const getList = async (storeId) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":storeId": { S: storeId },
    },
    KeyConditionExpression: "store_id = :storeId",
    TableName: "inventory",
  };

  try {
    const data = await dynamodb.send(new QueryCommand(params));

    const items = data?.Items?.map((item) => {
      return unmarshall(item);
    });

    return items;
  } catch (err) {
    console.log("Error:", err);
  }
};
