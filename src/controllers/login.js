import { getUserByEmail } from "../services/user.service.js";
import { verifyPassword } from "../utilities/password.js";
import { createToken } from "../utilities/token.js";

const login = async (req, res) => {
  const { emailId, password } = req.body;
  const user = await getUserByEmail(emailId);

  if (!user) {
    res.status(400);
    res.json({ message: "user not found" });
    return;
  }

  const isMatch = await verifyPassword(password, user.hashedPassword);

  if (!isMatch) {
    res.status(401);
    res.json({ message: "Password is incorrect" });
    return;
  }

  const { hashedPassword, ...withoutPassword } = user;
  const token = createToken(withoutPassword);

  res.status(200);
  res.json({
    message: "Success",
    payload: {
      accessToken: token,
    },
  });
};

export default login;
