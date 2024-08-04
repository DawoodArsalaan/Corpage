require("dotenv").config(); // No need to specify the path if it's .env in the root directory
const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.error('Database connection error', err);
  process.exit();
});

async function createAdmin() {
  try {
    const Admin = require("../models/Admin");
    const newAdmin = new Admin();
    const passwordHash = newAdmin.generateHash("123456");

    await new Admin({
      email: "admin@demo.com",
      password: passwordHash,
      name: "admin",
      surname: "demo",
    }).save();
    console.log("👍👍👍👍👍👍👍👍 Admin created : Done!");
    process.exit();
  } catch (e) {
    console.log("\n👎👎👎👎👎👎👎👎 Error! The Error info is below");
    console.log(e);
    process.exit();
  }
}

createAdmin();
