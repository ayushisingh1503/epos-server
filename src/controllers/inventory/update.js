import { update } from "../../services/inventory.service.js";

const updateItemQuantity = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { itemId, quantity } = req.body;

    if (!quantity) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });
      return;
    }
    const itemPayload = { quantity, itemId };

    await update(storeId, itemPayload);

    res.status(200);
    res.json({
      status: "Success",
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

export default updateItemQuantity;
