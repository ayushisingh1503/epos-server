import currency from "currency.js";
import {
  getList as getInventoryList,
  update as updateInventory,
} from "../../services/inventory.service.js";
import { create } from "../../services/order.service.js";
import { v4 as uuidv4 } from "uuid";

const createOrder = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { items, order_number, staff_name } = req.body;

    if (!storeId || !items.length || !staff_name || !order_number) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }
    const order_id = uuidv4();
    const inventoryItems = await getInventoryList(storeId);
    const hasAnyItemExceededInventory = items.some((item) => {
      const inventoryItem = inventoryItems.find(
        (iItem) => iItem.item_id === item.menuItem.item_id
      );

      if (!inventoryItem || inventoryItem?.quantity < item.quantity) {
        return true;
      }

      return false;
    });

    if (hasAnyItemExceededInventory) {
      res.status(400).json({
        status: "Failed",
        message: "Item Unavailable",
      });

      return;
    }

    const orderItems = items.map((item) => {
      const options = { precision: 2 };
      const itemPrice = currency(item.menuItem.price).multiply(
        item.quantity
      ).value;
      const itemVat = currency(item.menuItem.tax_rate, options)
        .divide(100)
        .multiply(itemPrice).value;

      return {
        ...item,
        itemPrice,
        itemVat,
        menuItem: {
          ...item.menuItem,
          status: "not_started",
        },
      };
    });

    const amount = orderItems.reduce((acc, item) => {
      acc = acc.add(item.itemPrice);

      return acc;
    }, currency(0)).value;

    const totalVat = orderItems.reduce((acc, item) => {
      acc = acc.add(item.itemVat);

      return acc;
    }, currency(0)).value;

    await create({
      store_id: storeId,
      order_id,
      order_number,
      items: orderItems,
      amount,
      totalVat,
      staff_name,
      status: "open",
      note: req.body.note,
      created_at: Date.now(),
    });

    const inventoryPayload = items.map((item) => {
      const inventoryItem = inventoryItems.find(
        (iItem) => iItem.item_id === item.menuItem.item_id
      );

      return {
        item_id: item.menuItem.item_id,
        quantity: inventoryItem.quantity - item.quantity,
      };
    });

    // We don't want to wait for inventory update
    Promise.all(
      inventoryPayload.map((payload) => updateInventory(storeId, payload))
    );

    res.status(201);
    res.json({
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
};

export default createOrder;
