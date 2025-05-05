import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picturePath: { type: String, default: '' },
  friends: { type: Array, default: [] },
  location: { type: Array, default: [] },
  occupation: { type: String },
  viewedProfile: { type: Number },
  impressions: { type: Number },
}, 
{ timestamps: true}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;