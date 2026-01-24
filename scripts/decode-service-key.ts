import fs from "node:fs";
import path from "node:path";

// Paths
const envPath = path.resolve(".env.local");
const outputJsonPath = path.resolve("GOOGLE_SERVICE_ACCOUNT_KEY.decoded.json");

if (!fs.existsSync(envPath)) {
  console.error("❌ .env.local file not found");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");

// Extract the base64 string from the env file
const match = envContent.match(/^GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=(.+)$/m);

if (!match) {
  console.error("❌ GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 not found in .env.local");
  process.exit(1);
}

const base64 = match[1];
let jsonString: string;

try {
  jsonString = Buffer.from(base64, "base64").toString("utf8");
  JSON.parse(jsonString); // quick validation
} catch (err) {
  if (err instanceof Error) {
    console.error("❌ Failed to decode or parse JSON:", err.message);
  } else {
    console.error("❌ Failed to decode or parse JSON:", err);
  }
  process.exit(1);
}

// Write to file
fs.writeFileSync(outputJsonPath, jsonString, "utf8");

console.log(`✅ Decoded key written to ${outputJsonPath}`);
