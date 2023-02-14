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
      steps: [{ type: String }],
      image: {
        type: String,
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

    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );
  
  const Task = model("Task", taskSchema);
  
  module.exports = Task;
  