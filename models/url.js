import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL: {
    type: String,
    required: true
  },
  visitHistory: [{ timeStamp: { type: Number} }]
}, { timestamps: true } );

export const URL = mongoose.model('url', URLSchema);