import { create } from "../../services/user.service.js";
import { hashPassword } from "../../utilities/password.js";
import { v4 as uuidv4 } from "uuid";

const createUser = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { emailId, pin, accessRole } = req.body;

    if (!storeId || !emailId || !pin || !accessRole) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }

    const hashedPassword = await hashPassword(pin);
    const userId = uuidv4();
    const createdAt = Date.now();

    await create({
      store_id: storeId,
      email: emailId,
      hashedPassword,
      user_id: userId,
      created_at: createdAt,
      role: accessRole,
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

export default createUser;
