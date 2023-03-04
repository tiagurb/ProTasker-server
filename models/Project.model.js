const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image : {
    type: String,
    default: "https://res.cloudinary.com/dq8v89bym/image/upload/v1677322913/default-placeholder_ohn8cv.png",
  },
  users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Project = model("Project", projectSchema);

module.exports = Project;
