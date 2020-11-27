const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const PATHS = {
  src: path.join(__dirname, 'site/layouts')
}
console.log(glob.sync(`${PATHS.src}/**/*.html`, { nodir: true }));
module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
  },

  output: {
    path: path.join(__dirname, "dist")
  },

  module: {
    rules: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loader: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.((png)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      { test: /\.json$/, loader: "json-loader" },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      },

    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/fonts/",
        to: "fonts/",
        flatten: true
      }
    ]),

    new PurgecssPlugin({
      paths: () => glob.sync(`${PATHS.src}/**/*.html`, { nodir: true }),
      fontFace: true,
      rejected: true,
      whitelistPatterns: [/is-active$/],
    }),
  ]
};
