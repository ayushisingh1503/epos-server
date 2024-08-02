import { create, getList } from "../../services/user.service.js";
import { hashPassword } from "../../utilities/password.js";
import { v4 as uuidv4 } from "uuid";

const createUser = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { emailId, pin, accessRole, name } = req.body;
    const users = await getList(storeId);
    const existingUser = users.find((user) => user.email === emailId);

    if (!storeId || !emailId || !pin || !accessRole) {
      res.status(400);
      res.json({
        status: "Failed",
        message: "Missing required fields",
      });

      return;
    }

    if (existingUser) {
      res.status(400).json({
        error: "Failed",
        message: "Email already exists",
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

export default createUser;
