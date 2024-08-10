const JWT = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const adminToken = req.headers.admintoken; // It's a good practice to use lowercase header names

    if (adminToken) {
      JWT.verify(adminToken, "GYMAdmin", (err, decoded) => {
        if (decoded) {
          next();
        } else {
          res
            .status(401)
            .send({
              error: `Access denied. Invalid authentication.`,
              details: err.message,
            });
        }
      });
    } else {
      res.status(401).send({ error: "Please log in to perform this action." });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        error:
          "An error occurred while processing the request. Please try again later.",
        details: error.message,
      });
  }
};

module.exports = {
  adminAuth,
};
