import { create } from "../../services/category.service.js";
import { v4 as uuidv4 } from "uuid";

const createCategory = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { name } = req.body;

    if (!storeId || !name) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }

    const categoryId = uuidv4();

    await create({
      store_id: storeId,
      category_id: categoryId,
      name,
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

export default createCategory;
