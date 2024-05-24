const userRepository = require("../db/repositories/user");

exports.getUserStats = async (req, res) => {
  const userStats = await userRepository.getStats();
  return res.status(200).json(userStats);
};
