const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  en: { type: String },
  ar: { type: String },
});

const DescriptionSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: DescriptionSchema, required: true },
  area: { type: String, required: true },
  bedrooms: { type: String, required: true },
  bathrooms: { type: String, required: true },
  floors: { type: String, required: true },
  images: [{ type: String, required: true }],
  features: { type: [FeatureSchema] },
});

module.exports = mongoose.model("Project", ProjectSchema);
