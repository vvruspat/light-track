import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory name in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../public/_openapi.json");

// Read the file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Remove all occurrences of ./(.*).json
  const updatedData = data.replace(/\.\/(.*)\.json/g, "");

  // Write the updated data back to the file
  fs.writeFile(filePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }

    console.log("File updated successfully");
  });
});
