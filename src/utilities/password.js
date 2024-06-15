import bcrypt from "bcryptjs";

// verify a password
export async function verifyPassword(password, hPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hPassword);
    return isMatch;
  } catch (e) {
    console.error("Error verifying password:", e);
  }
}
