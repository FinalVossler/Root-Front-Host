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
    output: {
      publicPath: "http://localhost:3000/",
    },

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
        template: "./src/index.html",
      }),
    ],
  };
};

// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const webpack = require("webpack");
// const path = require("path");

// const deps = require("./package.json").dependencies;
// module.exports = (_, argv) => {
//   if (argv.mode === "development") {
//     require("dotenv").config({ path: `./.env.development` });
//   } else {
//     require("dotenv").config();
//   }

//   return {
//     entry: {
//       app: "./src/index.ts",
//     },
//     output: {
//       path: path.resolve(__dirname, "dist"),
//       filename: "[name].[hash:8].js",
//       sourceMapFilename: "[name].[hash:8].map",
//       chunkFilename: "[id].[hash:8].js",
//     },
//     devtool: "source-map",

//     resolve: {
//       extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
//     },

//     devServer: {
//       port: 3000,
//       historyApiFallback: true,
//     },

//     module: {
//       rules: [
//         {
//           test: /\.m?js/,
//           type: "javascript/auto",
//           resolve: {
//             fullySpecified: false,
//           },
//         },
//         {
//           test: /\.(css|s[ac]ss)$/i,
//           use: ["style-loader", "css-loader", "postcss-loader"],
//         },
//         {
//           test: /\.(ts|tsx|js|jsx)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: "babel-loader",
//           },
//         },
//       ],
//     },

//     plugins: [
//       new webpack.DefinePlugin({
//         "process.env": JSON.stringify(process.env),
//       }),
//       new ModuleFederationPlugin({
//         name: "Root_Front_Host",
//         filename: "remoteEntry.js",
//         remotes: {},
//         exposes: {},
//         shared: {
//           ...deps,
//           react: {
//             singleton: true,
//             requiredVersion: deps.react,
//           },
//           "react-dom": {
//             singleton: true,
//             requiredVersion: deps["react-dom"],
//           },
//         },
//       }),
//       new HtmlWebPackPlugin({
//         template: "./src/index.html",
//       }),
//     ],
//   };
// };
