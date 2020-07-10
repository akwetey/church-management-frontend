const path = require("path");

module.exports = {
  devServer: {
    proxy: process.env.DEV_API_URL,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set(
      "@services",
      path.resolve(__dirname, "src/services")
    );
    config.resolve.alias.set("@assets", path.resolve(__dirname, "src/assets"));
    config.resolve.alias.set(
      "@components",
      path.resolve(__dirname, "src/components")
    );
    config.resolve.alias.set(
      "@layouts",
      path.resolve(__dirname, "src/router/layouts")
    );
    config.resolve.alias.set(
      "@views",
      path.resolve(__dirname, "src/router/views")
    );
    config.resolve.alias.set("@store", path.resolve(__dirname, "src/store"));
    config.resolve.alias.set("@router", path.resolve(__dirname, "src/router"));
  },
};
