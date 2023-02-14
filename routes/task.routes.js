const router = require("express").Router();
const { json, response } = require("express");
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require ("../middlewares/jwt.middleware")


//GET - get all tasks
router.get("/task", async (req, res) => {
    try {
      const response = await Task.find();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });
  
  //POST - create a task
  router.post("/task", isAuthenticated, async (req, res) => {
    try {
      //console.log("user id", req.payload._id);
      const userID = req.payload._id;
      const { title, description, imageUrl } = req.body;
      if (!title || !description) {
        res.status(400).json({ message: "missing fields" });
        return;
      }
      const response = await Project.create({ title, description, imageUrl });
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
      const response = await Project.findById(req.params.projectId);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });
  
  //PUT PATCH
  router.put("/project/:projectId", async (req, res) => {
    try {
      const { title, description } = req.body;
      const response = await Project.findByIdAndUpdate(
        req.params.projectId,
        {
          title,
          description,
        },
        { new: true }
      );
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });
  
  //POST create tasks
  router.post("/task", async (req, res) => {
    try {
      const { title, description, project } = req.body;
      //1. Create the task
      const response = await Task.create({ title, description });
      //2. Update the project by pushing the task id to its task array
      const projectResponse = await Project.findByIdAndUpdate(
        project,
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
  
  //Upload
  router.post("/upload", fileUpload.single("filename"), async (req, res) => {
    try {
      res.status(200).json({ fileUrl: req.file.path});
    } catch (e) {
      res.status(500).json({ message: "An error occured while returning the image path" });
    }
  });
  
  module.exports = router;
  