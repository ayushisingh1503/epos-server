import { update, getUserById } from "../../services/user.service.js";
import { hashPassword } from "../../utilities/password.js";

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, email, pin, name } = req.body;

    if (!email || !role || !name) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }

    const user = await getUserById(userId);

    let hashedPassword = user.hashedPassword;
    if (pin) {
      hashedPassword = await hashPassword(pin);
    }

    const payload = { role, email, hashedPassword, name };

    await update(userId, user.created_at, payload);

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
