import { update, getOrderById } from "../../services/backoffice.service.js";
import { notify } from "../../utilities/pusher.js";

const updateItemStatus = async (req, res) => {
  try {
    const { storeId, orderId } = req.params;
    const { item_id, status } = req.body;

    if (!storeId || !orderId || !status || !item_id) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }
    const order = await getOrderById(storeId, orderId);
    // update the top level key like items in order[]
    const modifiedItems = order.items.map((iItem) => {
      if (iItem.menuItem.item_id === item_id) {
        return {
          ...iItem,
          menuItem: {
            ...iItem.menuItem,
            status: status,
          },
        };
      }

      return iItem;
    });

    await update(storeId, orderId, { items: modifiedItems });

    const currentItem = order.items?.find(
      (item) => item.menuItem?.item_id === item_id
    );

    await notify(
      "epos_statuses",
      `${currentItem?.menuItem?.name} moved to ${status} for order ${order.order_number}`
    );

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

export default updateItemStatus;
