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
    TableName: "items",
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

export const create = async (itemPayload) => {
  const dynamodb = getClient();
  const items = {
    TableName: "items",
    Item: itemPayload,
  };

  return await dynamodb.send(new PutCommand(items));
};

export const update = async (itemId, storeId, itemPayload) => {
  const dynamodb = getClient();
  const updateKeys = generateUpdateExpression(itemPayload);

  const items = {
    TableName: "items",
    Key: {
      item_id: itemId,
      store_id: storeId,
    },
    ...updateKeys,
    ReturnValues: "ALL_NEW",
  };

  return await dynamodb.send(new UpdateCommand(items));
};

export const deleteMenuItem = async (itemId, storeId) => {
  const dynamodb = getClient();
  const items = {
    TableName: "items",
    Key: {
      item_id: itemId,
      store_id: storeId,
    },
  };

  return await dynamodb.send(new DeleteCommand(items));
};
