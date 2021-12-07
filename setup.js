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
echo "Setting up ${process.env.NODE_ENV} environment...\n";
echo "🕙  Creating dw.json files...";
cp sample-dw.json ./dw.json;
echo "🔑  Setting credentials...";
json -I -f ./dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'";
json -I -f ./dw.json -e "this.username='${process.env.SFCC_USERNAME}'";
json -I -f ./dw.json -e "this.password='${process.env.SFCC_PASSWORD}'";
json -I -f ./dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'";
echo "🎉   Done.\n"
clear;
`;

const scripts = setupBashScript
  .split(";")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

scripts.forEach((script) => {
  if (!script.includes("echo")) {
    console.log(`🐙  ${script}`);
  }
  console.log(execSync(script, { encoding: "utf8" }));
});
