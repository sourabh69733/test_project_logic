const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  photosLink: Array,
  email: String,
  accessCode: String,
  refreshCode: String,
});

mongoose.model("User", UserSchema);
