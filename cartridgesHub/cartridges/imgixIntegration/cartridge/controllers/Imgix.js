// For more information about the file, visit
// https://medium.com/perimeterx/11-days-of-salesforce-storefront-reference-architecture-sfra-day-4-creating-a-basic-cartridge-2d8e9cf7cf86

// Import the server module used for routing.
const server = require("server");

// Add a “listener” for the Show route (i.e /imgix-show). If the route is hit,
// the imgix template will be rendered to the page.
server.get("Show", function (req, res, next) {
  const template = "imgix";

  res.render(template);
  // Call the next method, that will pass the request to the next middleware in
  // the chain. When the request reaches a middleware that does not call next,
  // the request will be considered as handled and the response object will
  // return to the caller.
  next();
});

// Export the module.
module.exports = server.exports();
