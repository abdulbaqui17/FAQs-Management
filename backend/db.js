const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/faqs";
mongoose.connect(mongoUrl)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));


const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: { type: Object, default: {} },
});

faqSchema.methods.getTranslatedQuestion = function (langCode) {
  return this.translations[`question_${langCode}`] || this.question;
};

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
