const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    assignedTerms: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
      hideJSON: true,
      minlength: 8
    },
    profilePicture: {
      type: String
    },
    bannedAt: {
      type: Date
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    emailConfirmed: {
      type: Boolean,
      default: false
    },
    unitsForCreationOffers: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    _id: true,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('User', schema);
