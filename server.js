const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
//app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/minDifferenceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for saving results in MongoDB
const resultSchema = new mongoose.Schema({
  nums: [Number],
  result: Number,
});

const Result = mongoose.model("Result", resultSchema);

// POST endpoint to calculate and save the result to the database
app.post("/calculate", async (req, res) => {
  const { nums } = req.body;

  // Perform calculation (similar to the previous code snippet)

  // Save result to the database
  const newResult = new Result({ nums, result: calculatedResult });
  await newResult.save();

  res.json({ result: calculatedResult });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
