import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  name?: string;
  verified: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  name: { type: String },
  verified: { type: Boolean, default: false }, 
}, {
  timestamps: true
});

export default mongoose.model<IUser>("User", UserSchema);
