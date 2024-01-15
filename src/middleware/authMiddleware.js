import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const tokenData = jwt.verify(token, process.env.JWT_KEY);
    req.user = tokenData;
    next();
  } catch (error) {
    res.json({ error: "invalid token" });
  }
};
