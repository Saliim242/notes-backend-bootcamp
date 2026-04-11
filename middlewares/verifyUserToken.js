import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  try {
    if (req.headers.Authorization && req.headers.authorization == undefined) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide token" });
    }

    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: false, message: err.message });
        }

        req.user = decoded.user;
        

        next();
      });
    }
    if (!token) {
      return res.status(403).json({
        status: false,
        message: "User is not Authorized or token messing in the request",
      });
    }
  } catch (error) {
    // console.log(error
    console.error("Verifying User Error", error);
    res.status(500).json({ status: false, message: error.message });
  }
};
