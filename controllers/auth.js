const userRepository = require("../db/repositories/user");
const { jwtToken } = require("../config");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { phone, password } = req.body;
  const userExists = await userRepository.findByPhone(phone);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await userRepository.create(req.body);
  const body = { message: "User created", data: user };
  return res.status(201).json(body);
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await userRepository.findByPhone(phone);

  if (!user || !(await user.checkPassword(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, jwtToken.secret, {
    expiresIn: jwtToken.expireIn,
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  return res
    .status(200)
    .json({ message: "Login successful", data: user, token });
};
