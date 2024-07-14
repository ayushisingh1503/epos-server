import {
  deleteItem,
  getCategoryById,
} from "../../services/category.service.js";

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await getCategoryById(categoryId);
    console.log(category);

    await deleteItem(category.category_id);

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
