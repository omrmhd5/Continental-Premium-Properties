require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ProjectRoutes = require("./Routes/ProjectRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/projects", ProjectRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
