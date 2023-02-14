const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      // required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      // required: [true, 'Password is required.']
    },
    username: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      // default:
    },
    projets: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: Schema.Types.ObjectId, ref:"Task"}],
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
