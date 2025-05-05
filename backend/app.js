const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { handleErrors } = require("./middlewares/handleErrors");
require("dotenv").config();
const Router = require("./routes");
const { requestRateLimiter } = require("./utils/requestRateLimiter");

const { NODE_ENV, PORT, URI } = process.env;

mongoose
  .connect(
    NODE_ENV !== "production" ? "mongodb://mongo:27017/mesto-listdb" : URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors({ origin: ["https://ststas.dev/mesto"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(requestRateLimiter);
app.use("/mesto/api", Router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT || 4001, () => {
  console.log(`Server running on port ${PORT}`);
});
