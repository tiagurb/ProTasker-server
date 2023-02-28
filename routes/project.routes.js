const router = require("express").Router();
const { json, response } = require("express");
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
const fileUpload = require("../config/cloudinary");
// const { isAuthenticated } = require ("../middlewares/jwt.middleware")

//GET - get all projects
router.get("/project", async (req, res) => {
  try {
    const response = await Project.find().populate("tasks");
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//POST - create a project
router.post("/project", async (req, res) => {
  try {
    //console.log("user id", req.payload._id);
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const response = await Project.create({ title });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//DELETE - delete a project
router.delete("/project/:projectId", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    res
      .status(200)
      .json({ message: `Project with ID ${req.params.projectId} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//GET ONE ROUTE

router.get("/project/:projectId", async (req, res) => {
  try {
    const response = await Project.findById(req.params.projectId).populate(
      "tasks"
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//PUT PATCH
router.put("/project/:projectId", async (req, res) => {
  try {
    const { title } = req.body;
    const response = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//POST create tasks
router.post("/tasks/create/:projectId", async (req, res) => {
  try {
    const { title, description, deadline, owner } = req.body;
    //1. Create the task
    const response = await Task.create({ title, description, deadline, owner });
    //2. Update the project by pushing the task id to its task array
    const projectResponse = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $push: { tasks: response._id },
      },
      { new: true }
    );
    res.status(200).json(projectResponse);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//DELETE - delete a task
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res
      .status(200)
      .json({ message: `Task with ID ${req.params.taskId} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Upload
router.post("/upload", fileUpload.single("filename"), async (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occured while returning the image path" });
  }
});

module.exports = router;
