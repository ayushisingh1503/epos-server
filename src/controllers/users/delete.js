import { deleteItem, getUserById } from "../../services/user.service.js";

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId);

    await deleteItem(userId, user.created_at);

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

export default deleteUser;
