const router = require("express").Router();
const usersRouter = require("./usersRouter");
const authRouter = require("./authRouter");
const groupsRouter = require("./groupsRouter");
const directionsRouter = require("./directionsRouter");

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/groups", groupsRouter);
router.use("/directions", directionsRouter)

module.exports = router;
