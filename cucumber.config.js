const { format } = require("node:path");

module.exports = {
  default: {
    paths: ["src/features/**/*.feature"],
    require: [
      "src/hooks/hooks.ts",
      "src/steps/**/*.ts",
      "src/support/pageFixture.ts"
    ],
    tags:'@suppression',
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      'allure-cucumberjs/reporter',
      ["html", "rapports/cucumber-report.html"],
      ["json", "rapports/cucumber-report.json"]
    ],
    formatOptions: {
      snippetInterface: "async-await"
    }

  }
};
