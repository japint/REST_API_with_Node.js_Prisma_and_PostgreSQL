const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);

module.exports = router;
