const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
    {
      title: {
        type: String,
        // required: true,
      },
      users: [{type: Schema.Types.ObjectId, ref: "Users"}],
      tasks: [{type: Schema.Types.ObjectId, ref: "Task"}],
    }
  );
  
  const Project = model("Project", projectSchema);
  
  module.exports = Project;
  