const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

//  only this CORS block:
const corsOptions = {
  origin: ["https://jhgjhgj.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

//  manually handle OPTIONS requests (preflight) globally:
// app.options("*", cors(corsOptions)); // ✅ valid path format
 



// Routes
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");


app.get("/", (req, res) => {
  res.send("API is running successfully! ");
});


// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
