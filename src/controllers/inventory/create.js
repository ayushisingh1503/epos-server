import { create } from "../../services/inventory.service.js";

const createInventoryItem = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { item_id, quantity } = req.body;

    if (!storeId || !item_id || quantity === null || quantity === undefined) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }
    await create({
      store_id: storeId,
      item_id: item_id,
      quantity: quantity,
    });

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

export default createInventoryItem;
