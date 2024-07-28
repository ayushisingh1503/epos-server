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

    const item_id = uuidv4();

    await create({
      store_id: storeId,
      item_id: item_id,
      name: itemName,
      price,
      category: category,
      tax_rate: taxRate,
    });

    res.status(201);
    res.json({
      message: "Success",
      payload: { item_id },
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
