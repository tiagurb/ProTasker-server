const router = require("express").Router();
const { json, response } = require("express");
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
const fileUpload = require("../config/cloudinary");

//GET - get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const response = await Task.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//PUT PATCH
router.put("/tasks/update/:taskId", async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;
    const response = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title,
        description,
        deadline,
        status,
      },
      { new: true }
    );
    console.log("response", response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/tasks/status/:taskId", async (req, res) => {
  try {
    const { status } = req.body;
    const response = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        status,
      },
      { new: true }
    );
    console.log("response", response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//GET ONE ROUTE

router.get("/tasks/:taskId", async (req, res) => {
  try {
    const response = await Task.findById(req.params.taskId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
