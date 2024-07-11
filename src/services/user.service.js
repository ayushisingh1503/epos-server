import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { getClient } from "../utilities/dbclient.js";
import {
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { generateUpdateExpression } from "../utilities/update-expression.js";

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

export const getUserById = async (userId) => {
  const dynamodb = getClient();
  const params = {
    ExpressionAttributeValues: {
      ":userId": { S: userId },
    },
    KeyConditionExpression: "user_id = :userId",
    TableName: "users",
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

    const items = data?.Items?.map((item) => {
      const { hashedPassword, ...user } = item;
      return unmarshall(user);
    });

    return items;
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

export const deleteItem = async (userId, createdAt) => {
  const dynamodb = getClient();
  const items = {
    TableName: "users",
    Key: {
      user_id: userId,
      created_at: createdAt,
    },
  };

  return await dynamodb.send(new DeleteCommand(items));
};

export const update = async (userId, createdAt, userPayload) => {
  const dynamodb = getClient();
  const updateKeys = generateUpdateExpression(userPayload);

  const items = {
    TableName: "users",
    Key: {
      user_id: userId,
      created_at: createdAt,
    },
    ...updateKeys,
    ReturnValues: "ALL_NEW",
  };

  return await dynamodb.send(new UpdateCommand(items));
};
