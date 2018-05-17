const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlConfig = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "index.html",
  inject: "body"
});
module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index_bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [HtmlConfig]
};
