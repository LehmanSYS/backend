const router = require("express").Router();
const findRouter = require("./findRouter");
const locationRouter = require("./locationRouter");
const watsonRouter = require('./watsonRouter');
const weatherRouter = require("./weatherRouter");

router.use("/location", locationRouter);
router.use("/find", findRouter);
router.use("/watson", watsonRouter);
router.use("/weather",weatherRouter);

module.exports = router;
