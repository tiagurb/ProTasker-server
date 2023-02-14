const { Schema, model } = require("mongoose");

const projectchema = new Schema(
    {
      title: {
        type: String,
        // required: true,
      },
      tasks: [{type: Schema.Types.ObjectId, ref: "Task"}],
    }
  );
  
  const Project = model("Project", projectSchema);
  
  module.exports = Project;
  