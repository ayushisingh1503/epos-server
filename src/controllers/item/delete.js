import { deleteMenuItem } from "../../services/item.service.js";

const deleteItem = async (req, res) => {
  try {
    const { itemId, storeId } = req.params;

    await deleteMenuItem(itemId, storeId);

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

export default deleteItem;
