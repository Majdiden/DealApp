const adRepository = require("../db/repositories/ad");

exports.createAd = async (req, res) => {
  const { createdBy, ...adData } = req.body;
  const createdAd = await adRepository.create({
    ...adData,
    createdBy: req.user._id,
  });

  return res.status(201).json({ message: "Ad created", data: createdAd });
};
