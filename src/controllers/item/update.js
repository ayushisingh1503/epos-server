import { update } from "../../services/item.service.js";

const updateItem = async (req, res) => {
  try {
    const { itemId, storeId } = req.params;
    const { category, name, price, tax_rate } = req.body;

    if (!category || !tax_rate || !price || !name) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });
      return;
    }
    const payload = { category, tax_rate, price, name };

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
