import { getList } from "../../services/user.service.js";

const getUsers = async (req, res) => {
  try {
    const { storeId } = req.params;
    const users = await getList(storeId);

    res.status(200);
    res.json({
      status: "Success",
      payload: {
        users,
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

export default getUsers;
