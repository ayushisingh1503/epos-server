import { update, getUserById } from "../../services/user.service.js";
import { hashPassword } from "../../utilities/password.js";

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, email, pin } = req.body;

    const user = await getUserById(userId);

    let hashedPassword = "";
    if (pin) {
      hashedPassword = await hashPassword(pin);
    }

    const payload = { role, email, hashedPassword };

    const filteredPayload = Object.keys(payload).reduce((acc, key) => {
      if (payload[key]) {
        acc[key] = payload[key];
      }

      return acc;
    }, {});

    await update(userId, user.created_at, filteredPayload);

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

export default updateUser;
