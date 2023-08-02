import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      unique: false,
    },
  },
  {
    collection: "users",
  }
);

// export const UserModel = mongoose.model("User", UserSchema);
//
// export const createUser = (values: Record<string, any>) => {
//   new UserModel(values).save().then((user) => {
//     user.toObject();
//   });
// };

// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

export const User = mongoose.model("User", UserSchema);
