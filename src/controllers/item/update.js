import { update } from "../../services/item.service.js";

const updateItem = async (req, res) => {
  try {
    const { itemId, storeId } = req.params;
    const { category, name, price, taxRate, imageKey } = req.body;

    if (!category || !taxRate || !price || !name) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });
      return;
    }
    const payload = {
      category,
      tax_rate: taxRate,
      price,
      name,
      image_key: imageKey,
    };

    await update(itemId, storeId, payload);

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

export default updateItem;
