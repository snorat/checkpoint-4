const express = require("express");

const router = express.Router();

const uploadMiddleware = require("./middlewares/upload");

const userControllers = require("./controllers/userControllers");
const postControllers = require("./controllers/postControllers");

const auth = require("./middlewares/auth");

// TABLE USERS
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/profile/:id", userControllers.getProfile);

router.post("/login", auth.checkEmailIfExist, userControllers.verifyPassword);
router.post(
  "/users",
  auth.validateUser,
  auth.hashPassword,
  userControllers.add
);
router.post("/test", uploadMiddleware.uploadFile, postControllers.checkUpload);

router.put("/users/:id", userControllers.edit);

// TABLE POST
router.get("/post/:id", postControllers.read);
router.get("/posts", postControllers.select);
router.get("/postbyuser/:userId", postControllers.readPostbyUser);
router.delete("/post/:userId/:announceId", postControllers.deletePost);

router.post("/post", uploadMiddleware.uploadFile, postControllers.add);
// router.post("/announce", uploadMiddleware.uploadFile, postControllers.addImage);

// router.delete("/users/:id", userControllers.destroy);

module.exports = router;
