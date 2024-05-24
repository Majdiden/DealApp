const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ["ADMIN", "CLIENT", "AGENT"],
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: String,
  status: {
    type: String,
    enum: ["ACTIVE", "DELETED"],
  },
});

userSchema.plugin(aggregatePaginate);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model("User", userSchema);
