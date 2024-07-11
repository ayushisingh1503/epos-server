import bcrypt from "bcryptjs";

// verify a password
export async function verifyPassword(password, hPassword) {
  const isMatch = await bcrypt.compare(password, hPassword);
  return isMatch;
}

//hash a password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  // const hasheddPassword = await bcrypt.hash(password, salt);
  // return hasheddPassword;

  return await bcrypt.hash(password, salt);
}
