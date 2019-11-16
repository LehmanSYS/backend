const router = require("express").Router();
const findRouter = require("./findRouter");
const locationRouter = require("./locationRouter");
const watsonRouter = require('./watsonRouter');

router.use("/location", locationRouter);
router.use("/find", findRouter);
router.use("/watson", watsonRouter);

module.exports = router;
