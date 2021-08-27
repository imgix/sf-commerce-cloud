const server = require("server");

server.get("Show", function (req, res, next) {
  const template = "imgix";

  res.render(template);
  next();
});

module.exports = server.exports();
