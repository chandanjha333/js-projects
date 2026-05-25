import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const User = Mongoose.model('user', userSchema);
