const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: "https://res.cloudinary.com/dq8v89bym/image/upload/v1677322913/default-placeholder_ohn8cv.png",
      },
      creation: {
        type: Date,
        default: Date.now,
      },
      deadline: {
        type: Date,
        required: true,
      },
      creator: {
        type: { type: Schema.Types.ObjectId, ref: "User"},
      },
      users: [{ type: String }],
      status: {
        type: String,
        default: "to do",
      },

    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );
  
  const Task = model("Task", taskSchema);
  
  module.exports = Task;
  