const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  const isDevelopment = argv.mode === "development";
  if (isDevelopment) {
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

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
    devtool: "source-map",

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                plugins: [
                  isDevelopment && require.resolve("react-refresh/babel"),
                ].filter(Boolean),
              },
            },
          ],
        },
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
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: "./public", to: "./" }],
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          pestel: isDevelopment
            ? "pestel@http://localhost:3001/remoteEntry.js"
            : "pestel@https://erikusa-pestel.netlify.app/remoteEntry.js",
        },
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
        template: "./src/index.html",
      }),
    ].filter(Boolean),
  };
};
