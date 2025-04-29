const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/categories", require("./routes/categoryRoute"));

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
