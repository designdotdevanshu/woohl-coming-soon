// import fs from "node:fs";
// const json = fs.readFileSync("spreadsheet-keys.json", "utf8");
// const encoded = Buffer.from(json).toString("base64");
// console.log("Encoded JSON:", encoded);

import fs from "node:fs";
import path from "node:path";

// Paths
const jsonPath = path.resolve("spreadsheet-keys.json");
const envPath = path.resolve(".env.local");

// Read and encode the JSON key
if (!fs.existsSync(jsonPath)) {
  console.error("❌ JSON key file not found:", jsonPath);
  process.exit(1);
}

const rawJson = fs.readFileSync(jsonPath, "utf8");
const encodedKey = Buffer.from(rawJson).toString("base64");

// Read .env.local contents or initialize as empty
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";

// Split into lines and filter out existing key (if any)
const lines = envContent.split(/\r?\n/).filter((line) => !line.startsWith("GOOGLE_SERVICE_ACCOUNT_KEY_BASE64="));

// Add the updated key line
lines.push(`GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=${encodedKey}`);

// Join and write back to .env.local
fs.writeFileSync(envPath, lines.join("\n"), "utf8");

console.log("✅ GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 updated in .env.local");
