const app = require("./app");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const { uploadDir, storeImage, createPublic } = require("./controller/users");

const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb, { dbName: "db-contacts" });

const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

connection
  .then(() => {
    app.listen(3000, async () => {
      await createFolderIsNotExist(uploadDir);
      await createFolderIsNotExist(createPublic);
      await createFolderIsNotExist(storeImage);
      console.log("Database connection successfull");
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

module.exports = {
  connection,
};
