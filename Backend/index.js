const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const { connectMongoDb } = require("./connection");
const authRoute = require("./Router/authRouter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

connectMongoDb(process.env.MONGO_URI);

app.use("/api/auth", authRoute);

//
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "Frontend", "mernStack", "dist");

  app.use(express.static(distPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}



app.listen(port, () => {
	console.log(`🚀 Server running on port ${port}`);
});
