import { deleteItem } from "../../services/category.service.js";

const deleteCategory = async (req, res) => {
  try {
    const { categoryId, storeId } = req.params;

    await deleteItem(categoryId, storeId);

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

export default deleteCategory;
