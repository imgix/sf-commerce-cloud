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
echo "🐙  Updating submodules...";
git submodule update --recursive;
echo "🕙  Installing dependencies...";
npm install;
echo "🕙  Installing cartridgesHub dependencies...";
cd ./cartridgesHub && npm install &> /dev/null && cd ..;
echo "🕙  Installing sfra dependencies...";
cd storefront-reference-architecture && npm install &> /dev/null && cd ..;
echo "🕙  Installing sfra-jsdoc dependencies...";
cd sfra-jsdoc && npm install &> /dev/null && cd ..;
echo "🕙  Creating dw.json files...";
cp sample-dw.json storefront-reference-architecture/dw.json && cp sample-dw.json cartridgesHub/dw.json;
echo "🔑  Setting credentials...";
json -I -f storefront-reference-architecture/dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'" &> /dev/null;
json -I -f storefront-reference-architecture/dw.json -e "this.username='${process.env.SFCC_USERNAME}'" &> /dev/null;
json -I -f storefront-reference-architecture/dw.json -e "this.password='${process.env.SFCC_PASSWORD}'" &> /dev/null;
json -I -f storefront-reference-architecture/dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'" &> /dev/null;
json -I -f cartridgesHub/dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'" &> /dev/null;
json -I -f cartridgesHub/dw.json -e "this.username='${process.env.SFCC_USERNAME}'" &> /dev/null;
json -I -f cartridgesHub/dw.json -e "this.password='${process.env.SFCC_PASSWORD}'" &> /dev/null;
json -I -f cartridgesHub/dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'" &> /dev/null;
echo "🎉   Done.\n";
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

// const output = execSync(setupBashScript); // the default is 'buffer'
// console.log(
//   execSync(`echo "Setting up ${process.env.NODE_ENV} environment...\n"`)
// );
// console.log(execSync(`echo "🐙  Updating submodules..."`));
// console.log(execSync(`git submodule update --recursive`));
// console.log(execSync(`echo "🕙  Installing dependencies..."`));
// console.log(execSync(`npm install`));
// console.log(execSync(`echo "🕙  Installing cartridgesHub dependencies..."`));
// console.log(
//   execSync(`cd ./cartridgesHub && npm install &> /dev/null && cd ..`)
// );
// console.log(execSync(`echo "🕙  Installing sfra dependencies..."`));
// console.log(
//   execSync(
//     `cd storefront-reference-architecture && npm install &> /dev/null && cd ..`
//   )
// );
// console.log(execSync(`echo "🕙  Installing sfra-jsdoc dependencies..."`));
// console.log(execSync(`cd sfra-jsdoc && npm install &> /dev/null && cd ..`));
// console.log(execSync(`echo "🕙  Creating dw.json files..."`));
// console.log(
//   execSync(
//     `cp sample-dw.json storefront-reference-architecture/dw.json && cp sample-dw.json cartridgesHub/dw.json;`
//   )
// );
// console.log(execSync(`echo "🔑  Setting credentials..."`));
// console.log(
//   execSync(`json -I -f storefront-reference-architecture/dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'" &> /dev/null
// json -I -f storefront-reference-architecture/dw.json -e "this.username='${process.env.SFCC_USERNAME}'" &> /dev/null
// json -I -f storefront-reference-architecture/dw.json -e "this.password='${process.env.SFCC_PASSWORD}'" &> /dev/null
// json -I -f storefront-reference-architecture/dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'" &> /dev/null
// json -I -f cartridgesHub/dw.json -e "this.hostname='${process.env.SFCC_HOSTNAME}'" &> /dev/null
// json -I -f cartridgesHub/dw.json -e "this.username='${process.env.SFCC_USERNAME}'" &> /dev/null
// json -I -f cartridgesHub/dw.json -e "this.password='${process.env.SFCC_PASSWORD}'" &> /dev/null
// json -I -f cartridgesHub/dw.json -e "this.version='${process.env.SFCC_CODE_VERSION}'" &> /dev/null`)
// );
// console.log(execSync(`echo "🎉   Done.\n"`));
