import { getList, getOrdersByDate } from "../../services/backoffice.service.js";
import { getDateTime } from "../../utilities/time-converter.js";

export const getOrders = async (req, res) => {
  try {
    const { storeId } = req.params;
    const orders = await getList(storeId);

    res.status(200);
    res.json({
      status: "Success",
      payload: {
        orders,
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

export const getOrderList = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { timeSpan } = req.query;

    const { startDate, endDate } = getDateTime(timeSpan ?? "today");
    const orders = await getOrdersByDate(storeId, startDate, endDate);

    res.status(200);
    res.json({
      status: "Success",
      payload: {
        orders,
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
