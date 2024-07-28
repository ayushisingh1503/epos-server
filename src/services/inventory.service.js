import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { getClient } from "../utilities/dbclient.js";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
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

export const create = async (itemPayload) => {
  const dynamodb = getClient();
  const items = {
    TableName: "inventory",
    Item: {
      item_id: itemPayload.item_id,
      store_id: itemPayload.store_id,
      quantity: itemPayload.quantity,
    },
  };
  return await dynamodb.send(new PutCommand(items));
};

export const update = async (storeId, itemPayload) => {
  const dynamodb = getClient();
  const updateKeys = generateUpdateExpression({
    quantity: itemPayload.quantity,
  });

  const items = {
    TableName: "inventory",
    Key: {
      item_id: itemPayload.item_id,
      store_id: storeId,
    },
    ...updateKeys,
    ReturnValues: "ALL_NEW",
  };

  return await dynamodb.send(new UpdateCommand(items));
};
