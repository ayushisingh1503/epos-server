import { getList } from "../../services/category.service.js";

const getCategories = async (req, res) => {
  try {
    const { storeId } = req.params;
    const categories = await getList(storeId);

    res.status(200);
    res.json({
      status: "Success",
      payload: {
        categories,
      },
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

export default getCategories;
