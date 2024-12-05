const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */

const userSchema = mongoose.Schema({
  type: {
    type: String,
    default: "USER",
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },
  profilePhoto: {
    type: String,
    default:
      "https://res.cloudinary.com/appstar-applications/image/upload/v1644328160/users_sy8byr.png",
  },
  mobileNo: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function (payload) {
  const token = jwt.sign(payload, 'secret', {
    algorithm: "HS512",
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.generateRefreshToken = function (payload) {
  const token = jwt.sign(payload, 'secret', {
    algorithm: "HS512",
    expiresIn: "1d",
  });

  return token;
};


exports.User = mongoose.model("users", userSchema);


