const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: "Name is required" });
    }

    if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
      return res
        .status(409)
        .json({ error: `${req.body.name} category already exist` });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Validate name input
    if (!req.body.name) {
      return res.status(422).json({ error: "Name is required" });
    }

    // Check if the new name already exists (and it's not the same as the current category)
    const duplicateCategory = await prisma.category.findUnique({
      where: { name: req.body.name },
    });

    if (duplicateCategory && duplicateCategory.id !== categoryId) {
      return res
        .status(409)
        .json({ error: `${req.body.name} category already exists` });
    }

    // Perform update
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name: req.body.name },
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return res.status(200).send("Data was deleted successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
