const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Incorrect email value',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Your name',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Your occupation',
  },
  avatar: {
    type: String,
    default: 'https://www.hockney.com/img/gallery/digital/ipad/1219.jpg',
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Invalid link',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
