import { getOrderById } from "../../services/backoffice.service.js";
import sendEmail from "../../services/email.service.js";

const emailReceipt = async (req, res) => {
  const { orderId, storeId } = req.params;

  const { to } = req.body;

  if (!to) {
    res.status(400);
    res.json({
      status: "Failed",
      message: "Missing To field",
    });
  }
  const order = await getOrderById(storeId, orderId);
  const subject = `Your receipt for order ${order.order_number}`;
  const content = `<strong> order number: ${order.order_number} <br /> Total Amount: ${order.amount} </strong>`;

  await sendEmail(to, content, subject);
  res.status(201);
  res.json({
    message: "Success",
  });
};

export default emailReceipt;
