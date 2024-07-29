import { update } from "../../services/order.service.js";

const patchOrder = async (req, res) => {
  try {
    const { storeId, orderId } = req.params;
    const { status } = req.body;

    if (!storeId || !orderId || !status) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }
    await update(storeId, orderId, {
      status: req.body.status,
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

export default patchOrder;
