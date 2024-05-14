import cron from "cron";
import https from "https";

const URL = "https://chatapp-zdyr.onrender.com/";

const job = new cron.CronJob("*/14 9-22 * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
}, null, true, 'Asia/Kolkata');


export default job;
