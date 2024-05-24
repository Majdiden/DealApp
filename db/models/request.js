const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const requestSchema = new mongoose.Schema({
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

requestSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Request", requestSchema);
