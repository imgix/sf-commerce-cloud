export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  backgrounds: {
    default: "grey",
    values: [
      {
        name: "grey",
        value: "#EEF0F2",
      },
      {
        name: "white",
        value: "#ffffff",
      },
    ],
  },
};
