require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const fileUpload = require("express-fileupload");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieparser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
