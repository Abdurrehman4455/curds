const mongoose= require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: String,
    verificationTokenExpire: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },























   
  });
  
  
  module.exports = mongoose.model('Users', UserSchema);