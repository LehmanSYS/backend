const router = require("express").Router();
const campusRouter = require("./campusRouter");
const studentRouter = require("./studentRouter");
const usersRouter = require("./usersRouter");
const authRouter = require("../Router/authRouter");
const groupsRouter = require("../Router/groupsRouter");

// router.use("/campuses", campusRouter);
// router.use("/students", studentRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/groups", groupsRouter);

module.exports = router;
