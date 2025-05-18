require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ProjectRoutes = require("./Routes/projectRoutes");
const UserRoutes = require("./Routes/UserRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/projects", ProjectRoutes);
app.use("/api/admin", UserRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
