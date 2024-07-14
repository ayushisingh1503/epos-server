import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { getClient } from "../utilities/dbclient.js";

export const getList = async (storeId) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":storeId": { S: storeId },
    },
    KeyConditionExpression: "store_id = :storeId",
    TableName: "categories",
    // IndexName: "store_id-created_at-index",
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

export const getCategoryById = async (categoryId) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":categoryId": { S: categoryId },
    },
    KeyConditionExpression: "category_id = :categoryId",
    TableName: "categories",
  };

  try {
    const data = await dynamodb.send(new QueryCommand(params));

    return unmarshall(data?.Items?.[0]);
  } catch (err) {
    console.log("Error:", err);
  }
};

export const deleteItem = async (categoryId) => {
  const dynamodb = getClient();
  const items = {
    TableName: "categories",
    Key: {
      user_id: categoryId,
    },
  };

  return await dynamodb.send(new DeleteCommand(items));
};
