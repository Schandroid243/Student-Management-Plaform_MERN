const cluster = require("cluster");
const os = require("os");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`👑 Master ${process.pid} is running`);
  console.log(`🧵 Forking for ${numCPUs} CPUs...`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, restart it
  cluster.on("exit", (worker, code, signal) => {
    console.log(`⚠️ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  // Middleware
  app.use(express.json({ limit: "10mb" })); // replaces bodyParser.json
  app.use(express.urlencoded({ limit: "10mb", extended: true })); // replaces bodyParser.urlencoded
  app.use(cors());

  // MongoDB Connection
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`✅ Worker ${process.pid} connected to MongoDB`))
    .catch((err) =>
      console.error(`❌ Worker ${process.pid} failed to connect:`, err)
    );
  app.use(express.static(path.join(__dirname, "public")));
  // Routes
  app.use("/", Routes);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} started on port ${PORT}`);
  });
}
