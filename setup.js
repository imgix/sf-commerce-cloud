const execSync = require("child_process").execSync;
const fs = require("fs");
const dotenv = require("dotenv");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "DEVELOPMENT";
}

// read .env if not in a codespace environment
if (process.env.NODE_ENV !== "CODESPACES") {
  const envConfig = dotenv.parse(fs.readFileSync(".env"));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

const setupBashScript = `
echo "Setting up ${process.env.NODE_ENV} environment...\n"
echo "🐙  Updating submodules..."
git submodule update --recursive
echo "🕙  Installing dependencies..."
npm install
echo "🕙  Installing cartridgesHub dependencies..."
cd ./cartridgesHub && npm install &> /dev/null && cd ..
echo "🕙  Installing sfra dependencies..."
cd storefront-reference-architecture && npm install &> /dev/null && cd ..
echo "🕙  Installing sfra-jsdoc dependencies..."
cd sfra-jsdoc && npm install &> /dev/null && cd ..
echo "🔑  Setting credentials..."
json -I -f storefront-reference-architecture/dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'" &> /dev/null
json -I -f storefront-reference-architecture/dw.json -e "this.username='${process.env.SFCC_USERNAME}'" &> /dev/null
json -I -f storefront-reference-architecture/dw.json -e "this.password='${process.env.SFCC_PASSWORD}'" &> /dev/null
json -I -f storefront-reference-architecture/dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'" &> /dev/null
json -I -f cartridgesHub/dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'" &> /dev/null
json -I -f cartridgesHub/dw.json -e "this.username='${process.env.SFCC_USERNAME}'" &> /dev/null
json -I -f cartridgesHub/dw.json -e "this.password='${process.env.SFCC_PASSWORD}'" &> /dev/null
json -I -f cartridgesHub/dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'" &> /dev/null
echo "🎉   Done.\n"
`;

const output = execSync(setupBashScript, { encoding: "utf-8" }); // the default is 'buffer'

console.log("\n", output);
