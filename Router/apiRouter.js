const router = require("express").Router();
const campusRouter = require("./campusRouter");
const studentRouter = require("./studentRouter");
const usersRouter = require("./usersRouter");
const authRouter = require("../Router/authRouter");

router.use("/campuses", campusRouter);
router.use("/students", studentRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
