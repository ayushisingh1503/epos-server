import { getToken } from "../services/token.service.js";
import { verifyToken } from "../utilities/token.js";
import { getUserByEmail } from "../services/user.service.js";
import { createToken } from "../utilities/token.js";

const refreshToken = async (req, res) => {
  const { token, userId } = req.body;
  const userToken = await getToken(userId);

  if (!token || token !== userToken.refresh_token) {
    res.status(401);
    res.json({ message: "invalid token" });
    return;
  }

  try {
    const tokenVerified = verifyToken(token);
    const user = await getUserByEmail(tokenVerified.email);
    const { hashedPassword, ...withoutPassword } = user;
    const accessToken = createToken(withoutPassword, 5 * 60);

    const expirationSeconds = 5 * 60;
    const currentDate = new Date();
    const expirationTime = currentDate.setTime(
      currentDate.getTime() + expirationSeconds * 1000
    );

    res.status(200);
    res.json({
      message: "Success",
      payload: {
        accessToken: accessToken,
        refreshToken: token,
        expirationTime,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ message: "refresh token expired" });
    return;
  }
};

export default refreshToken;
