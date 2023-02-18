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

//GET ONE ROUTE

router.get("/tasks/:taskId", async (req, res) => {
    try {
      const response = await Task.findById(req.params.projectId);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });

module.exports = router;
