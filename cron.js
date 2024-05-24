const requestModel = require("./db/models/request");
const cron = require("node-cron");

module.exports.refreshRequests = async () => {
  const threeDays = () => {
    const startDate = new Date("2024-05-21"); // Change this to your desired start date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays % 3 === 0;
  };
  if (threeDays()) {
    cron.schedule("0 0 * * *", async () => {
      console.log("Refreshing requests...");
      await requestModel.updateMany({}, { refreshedAt: Date.now() });
      console.log(`Refreshing complete`);
    });
  }
};
