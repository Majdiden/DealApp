const RequestRepository = require("../db/repositories/request");
const AdRepository = require("../db/repositories/ad");

exports.createRequest = async (req, res) => {
  const { createdBy, ...requestData } = req.body;
  const request = await RequestRepository.create({
    ...requestData,
    createdBy: req.user._id,
  });
  return res.status(201).json({ message: "Request created", data: request });
};

exports.updateRequest = async (req, res) => {
  const { description, area, price } = req.body;
  const request = await RequestRepository.findByIdAndUpdate(req.params.id, {
    description,
    area,
    price,
  });
  return res.status(201).json({ message: "Request updated", data: request });
};

exports.match = async (req, res) => {
  const ad = await AdRepository.findById(req.params.id);
  const requests = await RequestRepository.find({
    district: ad.district,
    area: ad.area,
    price: {
      $gte: Math.floor(ad.price * 0.9),
      $lte: Math.ceil(ad.price * 1.1),
    },
  });
  return res.status(200).json(requests);
};
