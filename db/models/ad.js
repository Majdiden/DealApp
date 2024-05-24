const mongoose = require("mongoose");
const adSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    enum: ["VILLA", "HOUSE", "LAND", "APARTMENT"],
  },
  area: String,
  city: String,
  district: String,
  description: String,
  price: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Ad", adSchema);
