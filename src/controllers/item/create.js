import { create } from "../../services/item.service.js";
import { v4 as uuidv4 } from "uuid";

const createItem = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { itemName, price, taxRate, category } = req.body;

    if (!storeId || !itemName || !price || !taxRate || !category) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }

    const itemId = uuidv4();

    await create({
      store_id: storeId,
      item_id: itemId,
      name: itemName,
      price,
      category: category,
      tax_rate: taxRate,
    });

    res.status(201);
    res.json({
      message: "Success",
      payload: { itemId },
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

export default createItem;
