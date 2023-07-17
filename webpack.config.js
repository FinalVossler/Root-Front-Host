const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");
const path = require("path");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  if (argv.mode === "development") {
    require("dotenv").config({ path: `./.env.development` });
  } else {
    require("dotenv").config();
  }

  return {
    entry: {
      app: "./src/index.ts",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      publicPath: argv.mode === "development" ? "http://localhost:3000/" : "/",
    },
    devtool: "source-map",

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "Test",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
