import dotenv from "dotenv";
dotenv.config();

const key = process.env.PRIVATE_KEY;

console.log("Raw key from .env:", JSON.stringify(key));
if (key) {
  console.log("Length:", key.length);
  console.log("Starts with 0x:", key.startsWith("0x"));
  console.log("First 10 chars:", key.slice(0, 10));
  console.log("Last 10 chars:", key.slice(-10));
} else {
  console.log("❌ PRIVATE_KEY is undefined");
}
