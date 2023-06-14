import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema({
    username: {
      type: String
    },
    password: {
      type: String
    },
    region: {
      type: String
    },
    district: {
      type: String
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function(next: any) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashPassword = await bcrypt.hash(this["password"], 10);
    this["password"] = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});