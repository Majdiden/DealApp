const Ad = require("../models/ad");

class AdRepository {
  static async create(adData) {
    const ad = new Ad(adData);
    return await ad.save();
  }

  static async findById(id) {
    return await Ad.findById(id);
  }
}

module.exports = AdRepository;
