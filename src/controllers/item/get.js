import { getList } from "../../services/item.service.js";

const getItems = async (req, res) => {
  try {
    const { storeId } = req.params;
    const items = await getList(storeId);

    res.status(200);
    res.json({
      status: "Success",
      payload: {
        items,
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

export default getItems;
