const userAuth = (req, res, next) => {
  const token = "access";
  const isValid = token === "access";
  if (!isValid) {
    console.log("unauthorized");

    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  userAuth,
};
