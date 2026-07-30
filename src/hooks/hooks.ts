import {
  After,
  Before,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";
import fs from "fs";
import "dotenv/config";
import { config } from "../config/configLoader";

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(30_000);
BeforeAll(async function () {
  browser = await chromium.launch({ headless: true});
});
Before(async function () {
  context = await browser.newContext({
    baseURL: config.environnement.urlTest,
    recordVideo: { dir: "./rapports/videos" },
  });
  pageFixture.page = await context.newPage();
});
After(async function ({ result, pickle }) {
  if (result?.status == Status.PASSED) {
    const img = await pageFixture.page.screenshot({
      path: `./rapports/screenshot/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }

  await pageFixture.page.close();
  await context.close();
  //lancer le video et recuprer son chemin 
  const videoPath = await pageFixture.page.video()?.path();
   if (result?.status == Status.PASSED && videoPath) {
    const video = fs.readFileSync(videoPath);

    await this.attach(video, "video/webm");
   }



});
AfterAll(async function () {
  await browser.close();
});
