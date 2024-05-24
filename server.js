const express = require("express");
const config = require("./config");
const { connect } = require("./db/connection");
const { refreshRequests } = require("./cron");
const routes = require("./routes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const { port, baseUrl } = config.server;

const initializeDB = async () => {
  await connect();
};

initializeDB().catch((error) => console.error(error));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Deal App API",
      version: "1.0.0",
      description: "Deal App API",
    },
    servers: [{ url: `${baseUrl}:${port}` }],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { swaggerOptions: { defaultModelsExpandDepth: -1 } })
);

app.use(express.json());
app.use("/", routes);

refreshRequests();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
