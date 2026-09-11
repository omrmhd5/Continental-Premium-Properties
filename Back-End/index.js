require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ProjectRoutes = require("./Routes/ProjectRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const { UPLOADS_DIR, ensureUploadsDir } = require("./utils/uploads");

const app = express();
const PORT = process.env.PORT || 5000;

ensureUploadsDir();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));
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
