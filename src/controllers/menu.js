export const menu = (req, res) => {
  console.log(req.user);
  res.status(200);
  res.json({ message: "success" });
};
