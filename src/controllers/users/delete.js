import { deleteItem } from "../../services/user.service.js";

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await deleteItem(userId);

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
