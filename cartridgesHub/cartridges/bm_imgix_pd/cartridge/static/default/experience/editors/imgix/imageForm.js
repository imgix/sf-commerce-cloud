(() => {
  subscribe("sfcc:ready", async ({ value, config }) => {
    window.config = config;
  });
})();
