module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv",//bundle the env into our app
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
  ],
  };
};
