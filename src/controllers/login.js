import { getUserByEmail } from "../services/user.service.js";
import { verifyPassword } from "../utilities/password.js";
import { createToken } from "../utilities/token.js";
import { saveToken } from "../services/token.service.js";

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

  const expirationSeconds = 5 * 60;
  const currentDate = new Date();
  const expirationTime = currentDate.setTime(
    currentDate.getTime() + expirationSeconds * 1000
  );

  const { hashedPassword, ...withoutPassword } = user;
  const token = createToken(withoutPassword, expirationSeconds);
  const rToken = createToken(withoutPassword, 3 * 30 * 24 * 60 * 60);
  await saveToken(user.user_id, rToken);

  res.status(200);
  res.json({
    message: "Success",
    payload: {
      accessToken: token,
      refreshToken: rToken,
      expirationTime,
    },
  });
};

export default login;
